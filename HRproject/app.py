from datetime import datetime
import os
from flask import Flask, render_template, redirect, url_for, request, flash, session, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from werkzeug.utils import secure_filename
from wtforms import StringField, PasswordField
from wtforms.fields.simple import SubmitField
from wtforms.validators import  Email, DataRequired, EqualTo
from models import db, User, Candidate, Education, Experience, CustomSkill, InterviewRound, File, Language
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']  # Will crash if missing (good for security)
app.config['SESSION_COOKIE_SECURE'] = True  # Force HTTPS (only in production)
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
# ===== DATABASE SETUP (Example for PostgreSQL) =====
if 'DATABASE_URL' in os.environ:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL'].replace(
        'postgres://', 'postgresql://'  # Fix for Render's old PostgreSQL URLs
    )

s = URLSafeTimedSerializer(app.secret_key)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message="Passwords must match")])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'ufarhr@gmail.com'
app.config['MAIL_PASSWORD'] = 'ppun yazz fsmu sftf'
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

mail = Mail(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('default'))

        else:
            flash('Invalid email or password', 'error')
            return redirect(url_for('login'))

    return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()

    if form.validate_on_submit():
        email = form.email.data
        username = form.username.data
        password = form.password.data

        if User.query.filter_by(email=email).first():
            return "User already exists", 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(email=email, username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))

    return render_template('signup.html', form=form)


@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            token = s.dumps(email, salt='password-reset-salt')
            link = url_for('reset_password', token=token, _external=True)

            # Send email
            msg = Message('Password Reset Request', recipients=[email])
            msg.body = f'''Hi {user.username},

            To reset your password, click the link below:
            {link}

            If you did not request this, just ignore this email.
            '''

            msg.html = f"""
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                  <h2 style="color: #111827;">Hi {user.username},</h2>
                  <p style="font-size: 16px; color: #374151;">
                    We received a request to reset your password. Click the button below to proceed:
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="{link}" style="display: inline-block; background-color: #111827; color: white; padding: 14px 25px; text-decoration: none; font-size: 16px; border-radius: 8px;">
                      Reset Password
                    </a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280;">
                    If you did not request a password reset, please ignore this email. This link will expire in 1 hour.
                  </p>
                  <p style="font-size: 14px; color: #9ca3af;">Thank you,<br>UFAR HR</p>
                </div>
              </body>
            </html>
            """
            mail.send(msg)

            flash('A password reset email has been sent.', 'info')
            return redirect(url_for('login'))
        else:
            flash('No account associated with that email.', 'error')
            return redirect(url_for('forgot_password'))

    return render_template('forgot_password.html')


@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)  # 1 hour expiry
    except SignatureExpired:
        flash('The password reset link has expired.', 'error')
        return redirect(url_for('forgot_password'))
    except BadSignature:
        flash('Invalid or tampered token.', 'error')
        return redirect(url_for('forgot_password'))

    if request.method == 'POST':
        new_password = request.form.get('newPassword')
        confirm_password = request.form.get('confirmPassword')

        if new_password != confirm_password:
            flash('Passwords do not match.', 'error')
            return redirect(url_for('reset_password', token=token))

        if len(new_password) < 8:
            flash('Password must be at least 8 characters long.', 'error')
            return redirect(url_for('reset_password', token=token))

        # Update user password
        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            flash('Your password has been updated successfully.', 'success')
            return redirect(url_for('login'))

    return render_template('reset_password.html', token=token)

@app.route('/')
@login_required
def default():
    return redirect(url_for('employees'))

@app.route('/employees')
@login_required
def employees():
    employee_list = Candidate.query.filter_by(user_id=current_user.id).all()
    return render_template('employees.html', employees=employee_list)


@app.route('/new_profile', methods=['GET', 'POST'])
@login_required
def new_profile():
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        birth_date = request.form.get('birth_date')
        gender = request.form.get('gender')
        cv_file = request.files.get('cv')

        birth_date_obj = datetime.strptime(birth_date, '%Y-%m-%d') if birth_date else None
        candidate = Candidate(
            user_id=current_user.id,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date_obj,
            gender=gender
        )

        db.session.add(candidate)
        db.session.commit()
        if cv_file and cv_file.filename:
            filename = secure_filename(cv_file.filename)
            # Save to uploads folder
            cv_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Store only the filename (not full path) in database
            file_record = File(
                candidate_id=candidate.id,
                file_type='CV',
                file_path=filename  # Just store the filename, not full path
            )
            db.session.add(file_record)
            db.session.commit()
        session['candidate_id'] = candidate.id

        return redirect(url_for('job_department'))

    return render_template('new_profile.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/job_department', methods=['GET', 'POST'])
@login_required
def job_department():
    candidate_id = session.get('candidate_id')
    candidate = Candidate.query.get(candidate_id)

    if request.method == 'POST':
        selected_department = request.form.get('selected_department')
        if candidate:
            candidate.department = selected_department
            db.session.commit()
        return redirect(url_for('education'))

    return render_template('job_department.html', candidate=candidate)

@app.route('/education', methods=['GET', 'POST'])
@login_required
def education():
    if request.method == 'POST':
        universities = request.form.getlist('university[]')
        faculties = request.form.getlist('faculty[]')
        degrees = request.form.getlist('degree[]')

        candidate_id = session.get('candidate_id')

        for university, faculty, degree in zip(universities, faculties, degrees):
            new_education = Education(
                candidate_id=candidate_id,
                university=university,
                faculty=faculty,
                level=degree
            )
            db.session.add(new_education)

        db.session.commit()
        return redirect(url_for('experience'))

    return render_template('education.html')

@app.route('/experience', methods=['GET', 'POST'])
@login_required
def experience():
    if request.method == 'POST':
        candidate_id = session.get('candidate_id')
        if not candidate_id:
            return "Candidate not found in session", 400

        companies = request.form.getlist('company_name')
        positions = request.form.getlist('position_held')
        start_dates = request.form.getlist('start_date')
        end_dates = request.form.getlist('end_date')

        for company, position, start, end in zip(companies, positions, start_dates, end_dates):
            new_experience = Experience(
                candidate_id=candidate_id,
                company_name=company,
                position_held=position,
                start_date=datetime.strptime(start, '%Y-%m-%d') if start else None,
                end_date=datetime.strptime(end, '%Y-%m-%d') if end else None
            )
            db.session.add(new_experience)

        db.session.commit()
        return redirect(url_for('skills'))

    return render_template('experience.html')

@app.route('/skills', methods=['GET', 'POST'])
@login_required
def skills():
    if request.method == 'POST':
        candidate_id = session.get('candidate_id')
        if not candidate_id:
            return "Candidate not found in session", 400

        languages = request.form.getlist('language[]')
        language_scores = request.form.getlist('language_score[]')

        for lang, score in zip(languages, language_scores):
            if lang and score:
                db.session.execute(
                    text("INSERT INTO languages (candidate_id, language, language_score) VALUES (:cid, :lang, :score)"),
                    {"cid": candidate_id, "lang": lang, "score": score}
                )

        custom_skills = request.form.getlist('skill_name[]')
        skill_scores = request.form.getlist('skill_score[]')

        for name, score in zip(custom_skills, skill_scores):
            if name and score:
                db.session.execute(
                    text("INSERT INTO custom_skills (candidate_id, skill_name, skill_score) VALUES (:cid, :name, :score)"),
                    {"cid": candidate_id, "name": name, "score": score}
                )
        db.session.commit()
        return redirect(url_for('legal'))
    return render_template('skills.html')


@app.route('/legal', methods=['GET', 'POST'])
@login_required
def legal():
    candidate_id = session.get('candidate_id')
    candidate = Candidate.query.get(candidate_id)

    if request.method == 'POST':
        has_criminal_record = request.form.get('has_criminal_record')
        candidate.has_criminal_record = True if has_criminal_record == 'yes' else False

        candidate.criminal_details = request.form.get('criminal_details') if has_criminal_record == 'yes' else None

        has_teaching_exp = request.form.get('has_teaching_exp')
        candidate.has_teaching_exp = True if has_teaching_exp == 'yes' else False

        candidate.teaching_place = request.form.get('teaching_place') if has_teaching_exp == 'yes' else None

        db.session.commit()
        return redirect(url_for('default'))
    return render_template('legal.html')

@app.route('/personal_info/<int:employee_id>')
@login_required
def personal_info(employee_id):
    employee = Candidate.query.get(employee_id)
    if employee is None:
        abort(404)
    return render_template('personal_info.html', employee=employee)

@app.route('/edit_profile/<int:employee_id>', methods=['GET', 'POST'])
@login_required
def edit_profile(employee_id):
    employee = Candidate.query.get_or_404(employee_id)

    if request.method == 'POST':
        employee.first_name = request.form.get('first_name')
        employee.last_name = request.form.get('last_name')
        employee.gender = request.form.get('gender')
        employee.birth_date = request.form.get('birth_date')
        employee.department = request.form.get('department')
        employee.has_teaching_exp = 'has_teaching_exp' in request.form
        employee.teaching_place = request.form.get('teaching_place')
        employee.has_criminal_record = 'has_criminal_record' in request.form
        employee.criminal_details = request.form.get('criminal_details')

        Education.query.filter_by(candidate_id=employee.id).delete()
        index = 1
        while f'education_level_{index}' in request.form:
            edu = Education(
                level=request.form.get(f'education_level_{index}'),
                university=request.form.get(f'education_university_{index}'),
                faculty=request.form.get(f'education_faculty_{index}'),
                candidate_id=employee.id
            )
            db.session.add(edu)
            index += 1

        Experience.query.filter_by(candidate_id=employee.id).delete()
        index = 1
        while f'exp_company_{index}' in request.form:
            exp = Experience(
                company_name=request.form.get(f'exp_company_{index}'),
                position_held=request.form.get(f'exp_position_{index}'),
                start_date=request.form.get(f'exp_start_{index}'),
                end_date=request.form.get(f'exp_end_{index}'),
                candidate_id=employee.id
            )
            db.session.add(exp)
            index += 1

        CustomSkill.query.filter_by(candidate_id=employee.id).delete()
        index = 1
        while f'skill_name_{index}' in request.form:
            skill = CustomSkill(
                skill_name=request.form.get(f'skill_name_{index}'),
                skill_score=int(request.form.get(f'skill_score_{index}', 0)),
                candidate_id=employee.id
            )
            db.session.add(skill)
            index += 1

        Language.query.filter_by(candidate_id=employee.id).delete()
        index = 1
        while f'lang_name_{index}' in request.form:
            lang = Language(
                language=request.form.get(f'lang_name_{index}'),
                # language_score=int(request.form.get(f'lang_score_{index}', 0)),
                language_score=request.form.get(f'lang_score_{index}', '').strip(),
                candidate_id=employee.id
            )
            db.session.add(lang)
            index += 1

        InterviewRound.query.filter_by(candidate_id=employee.id).delete()
        for i in range(1, 3):
            passed_val = request.form.get(f'round_{i}_passed')
            comment = request.form.get(f'round_{i}_comment')
            file = request.files.get(f'round_{i}_file')

            # Skip round if no data at all
            if not passed_val and not comment and (not file or file.filename == ''):
                continue

            evaluation_filename = None
            if file and file.filename:
                filename = secure_filename(file.filename)
                evaluation_path = os.path.join('static/uploads', filename)
                file.save(evaluation_path)
                evaluation_filename = filename

            round = InterviewRound(
                candidate_id=employee.id,
                round_number=i,
                passed=True if passed_val == 'true' else False if passed_val == 'false' else None,
                comment=comment,
                evaluation_file=evaluation_filename
            )
            db.session.add(round)

        if 'new_files' in request.files:
            files = request.files.getlist('new_files')
            for file in files:
                if file:
                    file_path = os.path.join('uploads', secure_filename(file.filename))
                    file.save(file_path)
                    new_file = File(candidate_id=employee.id, file_path=file_path)
                    db.session.add(new_file)
        db.session.commit()
        flash('Profile updated successfully!', 'success')
        return redirect(url_for('personal_info', employee_id=employee.id))

    return render_template('edit_profile.html', employee=employee)


@app.route('/delete_profile/<int:employee_id>', methods=['POST'])
def delete_profile(employee_id):
    employee = Candidate.query.get(employee_id)

    if not employee:
        flash('Employee not found.', 'error')
        return redirect(url_for('employees'))

    try:
        Education.query.filter_by(candidate_id=employee.id).delete()
        Experience.query.filter_by(candidate_id=employee.id).delete()
        CustomSkill.query.filter_by(candidate_id=employee.id).delete()
        Language.query.filter_by(candidate_id=employee.id).delete()
        File.query.filter_by(candidate_id=employee.id).delete()
        db.session.delete(employee)
        db.session.commit()

        flash('Employee profile has been deleted successfully.', 'success')
    except Exception as e:
        db.session.rollback()
        flash('An error occurred while deleting the profile.', 'error')

    return redirect(url_for('employees'))


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Render sets $PORT
    app.run(host='0.0.0.0', port=port, debug=False)

