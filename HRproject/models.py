from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
import pyotp
import base64
import os

db = SQLAlchemy()

# User model (admin)
class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)

    totp_secret = db.Column(db.String(32), nullable=True)
    is_2fa_enabled = db.Column(db.Boolean, default=False, nullable=False)

    def ensure_totp_secret(self):
        if not self.totp_secret:
            self.generate_totp_secret()
            self.is_2fa_enabled = True

    def generate_totp_secret(self):
        self.totp_secret = base64.b32encode(os.urandom(10)).decode('utf-8')

    def get_totp_uri(self):
        return f"otpauth://totp/HRProject:{self.email}?secret={self.totp_secret}&issuer=HRProject"

    def verify_totp(self, token):
        if not self.totp_secret:
            return False
        totp = pyotp.TOTP(self.totp_secret)
        return totp.verify(token)

    candidates = db.relationship('Candidate', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'


class Candidate(db.Model):
    __tablename__ = 'candidates'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    department = db.Column(db.String(100), nullable=False)
    has_teaching_exp = db.Column(db.Boolean, default=False)
    teaching_place = db.Column(db.String(200), nullable=True)
    has_criminal_record = db.Column(db.Boolean, default=False)
    criminal_details = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default='active')
    interview_status = db.Column(db.String(20), nullable=False, default='not_started')
    ai_score = db.Column(db.Integer, nullable=True)

    educations = db.relationship('Education', backref='candidate', lazy=True)
    experiences = db.relationship('Experience', backref='candidate', lazy=True)
    interview_rounds = db.relationship('InterviewRound', backref='candidate', lazy=True)
    files = db.relationship('File', backref='candidate', lazy=True)
    custom_skills = db.relationship('CustomSkill', backref='candidate', lazy=True)
    languages = db.relationship('Language', backref='candidate')



class Education(db.Model):
    __tablename__ = 'educations'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    level = db.Column(db.String(50))
    university = db.Column(db.String(200))
    faculty = db.Column(db.String(200))


class Experience(db.Model):
    __tablename__ = 'experiences'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    company_name = db.Column(db.String(200))
    position_held = db.Column(db.String(200))
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)

class Language(db.Model):
    __tablename__ = 'languages'
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    language = db.Column(db.String(100), nullable=False)
    language_score = db.Column(db.String(20), nullable=False)



class CustomSkill(db.Model):
    __tablename__ = 'custom_skills'
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    skill_score = db.Column(db.String(20), nullable=False)


class InterviewRound(db.Model):
    __tablename__ = 'interview_rounds'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    round_number = db.Column(db.Integer)
    passed = db.Column(db.Boolean)
    comment = db.Column(db.Text)
    evaluation_file = db.Column(db.String(200))


class File(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    file_type = db.Column(db.String(50))
    file_path = db.Column(db.String(200))
