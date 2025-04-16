from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

# User model (admin/staff who manage candidates)
class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)

    candidates = db.relationship('Candidate', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

# Positions (e.g. Lecturer, Admin Assistant)
class Position(db.Model):
    __tablename__ = 'positions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    role_type = db.Column(db.String(100), nullable=False)  # Administrative or Professor

    candidates = db.relationship('Candidate', backref='position', lazy=True)

# Status (e.g. Applied, Interviewed, Rejected)
class Status(db.Model):
    __tablename__ = 'statuses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    candidates = db.relationship('Candidate', backref='status', lazy=True)

# Main Candidate table
class Candidate(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    position_id = db.Column(db.Integer, db.ForeignKey('positions.id'))
    status_id = db.Column(db.Integer, db.ForeignKey('statuses.id'))

    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    has_teaching_exp = db.Column(db.Boolean, default=False)
    teaching_place = db.Column(db.String(200), nullable=True)
    has_criminal_record = db.Column(db.Boolean, default=False)
    criminal_details = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    educations = db.relationship('Education', backref='candidate', lazy=True)
    experiences = db.relationship('Experience', backref='candidate', lazy=True)
    interview_rounds = db.relationship('InterviewRound', backref='candidate', lazy=True)
    files = db.relationship('File', backref='candidate', lazy=True)
    skills = db.relationship('CandidateSkill', backref='candidate', lazy=True)

# Education history
class Education(db.Model):
    __tablename__ = 'educations'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    level = db.Column(db.String(50))  # e.g. Bachelor's, Master's, PhD
    university = db.Column(db.String(200))
    faculty = db.Column(db.String(200))

# Work experience
class Experience(db.Model):
    __tablename__ = 'experiences'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    company_name = db.Column(db.String(200))
    position_held = db.Column(db.String(200))
    duration = db.Column(db.String(100))  # or use start_date and end_date if needed

# Skills list (global)
class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

# Candidate's specific skills
class CandidateSkill(db.Model):
    __tablename__ = 'candidate_skills'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)
    value = db.Column(db.String(100))  # e.g. Intermediate, Advanced, etc.

    skill = db.relationship('Skill', backref='candidate_skills')

# Interview rounds
class InterviewRound(db.Model):
    __tablename__ = 'interview_rounds'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    round_number = db.Column(db.Integer)
    passed = db.Column(db.Boolean)
    comment = db.Column(db.Text)
    evaluation_file = db.Column(db.String(200))  # file name or path

# Uploaded files (CV, Evaluation, etc.)
class File(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    file_type = db.Column(db.String(50))  # e.g. CV, Certificate
    file_path = db.Column(db.String(200))  # file name or path
