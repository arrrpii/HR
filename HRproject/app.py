from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.simple import SubmitField
from wtforms.validators import InputRequired, Email, DataRequired, EqualTo

from models import db, User, Position, Status, Candidate, Education, Experience, Skill, CandidateSkill, InterviewRound, File

app = Flask(__name__)

# Configure your database URI (replace with your actual database credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://arpi:userarpi@localhost/HR'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key_here'

# Initialize SQLAlchemy
db.init_app(app)

# Initialize Flask-Login
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



# User loader function for Flask-Login
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

@app.route('/')
@login_required  # Only logged-in users can access the dashboard
def default():
    return render_template('directory.html', username=current_user.username)

@app.route('/employees')
@login_required
def employees():
    return render_template('employees.html')

@app.route('/new_profile')
@login_required
def new_profile():
    return render_template('new_profile.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))





if __name__ == '__main__':
    app.run(debug=True)

