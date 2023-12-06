from django.db import models
from django.contrib.auth.models import User
#from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Comment(models.Model):
    comment_text = models.CharField(max_length=200, null=True)
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
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

# class User(models.Model):
#     user_name = models.CharField(max_length=200, null=True)
#     user_password = models.CharField(max_length=200, null=True)
#     user_email = models.CharField(max_length=200, null=True)
#     user_comments = ArrayField(models.CharField(max_length=100), blank=True, null=True)
#     def __str__(self):
#         return self.user_name