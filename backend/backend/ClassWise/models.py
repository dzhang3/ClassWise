from django.db import models

# Create your models here.
class Course(models.Model):
    course_name = models.CharField(max_length=200, null=True)
    course_code = models.CharField(max_length=200, null=True)
    # TODO: indicate which instructor is for which semester.
    course_instructors = models.CharField(max_length=200, null=True)
    # could be multiple
    course_prerequisites = models.CharField(max_length=200, null=True)
    # could be multiple
    course_offering_terms = models.CharField(max_length=200, null=True)
    # multiple
    course_previous_grade = models.CharField(max_length=200, null=True)
    course_description = models.CharField(max_length=200, null=True)
    #course_credit = models.IntegerField(null=False)
    comments = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.course_name