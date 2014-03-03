from flask.ext.wtf import Form
from wtforms import TextField, PasswordField, BooleanField
from wtforms.validators import Required, Length, Email

class SignupForm(Form):
    email = TextField('Email address', validators=[
                Required('Please provide a valid email address'),
                Email(message=(u'That\'s not a valid email address'))])
    password = PasswordField('Pick a secure password', validators=[
                Required('Please enter a password'),
                Length(min=6, message=(u'Password must be at least 6 characters'))])
    username = TextField('Choose your username', validators=[Required()])
    agree = BooleanField('By signing up your agree to follow our <a href="#">Terms of Services</a>',
                validators=[Required(u'You must agree the Terms of Service')])    
    remember_me = BooleanField('remember_me', default = False)

class LoginForm(Form):
    email = TextField('Email address', validators=[
                Required('Please enter the email address you used to sign up'),
                Email(message=(u'That\'s not a valid email address'))])
    password = PasswordField('Enter password', validators=[
                Required('Please enter your password'),
                Length(min=6, message=(u'Password must be at least 6 characters'))])
    remember_me = BooleanField('remember_me', default = False)

class AddObjective(Form):
    objective_name = TextField('objective_name', validators = [Required()])