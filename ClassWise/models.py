from django.db import models

# Create your models here.
class Course(models.Model):
    course_name = models.CharField(max_length=200, null=True)
    course_code = models.CharField(max_length=200, null=True)
    course_duration = models.CharField(max_length=200, null=True)
    course_fee = models.CharField(max_length=200, null=True)
    course_description = models.CharField(max_length=200, null=True)
    course_image = models.ImageField(null=True, blank=True)
    course_date_created = models.DateTimeField(auto_now_add=True, null=True)
    # TODO
    comments = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.course_name