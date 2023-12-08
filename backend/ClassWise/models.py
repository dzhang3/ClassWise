from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
#from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Comment(models.Model):
    comment_text = models.CharField(max_length=200, null=True)
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_user = models.ForeignKey("UserAccount", on_delete=models.CASCADE, null=True)
    comment_course = models.OneToOneField('Course', on_delete=models.CASCADE, null=True)
    comment_professor = models.OneToOneField('Instructor', on_delete=models.PROTECT)
    # Course and comments are one to many
    def __str__(self):
        return self.comment_text

class Instructor(models.Model):
    instructor_name = models.CharField(max_length=200, blank=False, null=False)
    instructor_rating = models.FloatField(null=True, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],)
    def __str__(self):
        return self.instructor_name

class Course(models.Model):
    course_name = models.CharField(max_length=200, null=False)
    course_code = models.CharField(max_length=200, null=False)
    course_description = models.CharField(max_length=200, null=False)
    course_instructors = models.ManyToManyField(Instructor)
    course_prerequisites = models.ManyToManyField('self', symmetrical=False, related_name='prerequisite_of')
    course_corequisites = models.ManyToManyField('self', symmetrical=False, related_name='corequisite_of')
    course_restrictions = models.CharField(max_length=1000, null=True)
    course_offering_terms = models.CharField(max_length=200, null=True)
    # TODO: course_previous_grades = ArrayField(models.CharField(max_length=100), null=True)
    course_previous_grades = models.CharField(max_length=200, null=True)
    course_credit = models.PositiveIntegerField(null=False)
    def __str__(self):
        return self.course_name

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    def get_full_name(self):
        return self.first_name
    def get_short_name(self):
        return self.first_name
    def __str__(self):
        return self.email