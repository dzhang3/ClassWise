from django.contrib import admin
from .models import Course, Instructor, Comment, UserAccount
# Register your models here.
admin.site.register(Course)
admin.site.register(Instructor)
admin.site.register(Comment)
admin.site.register(UserAccount)
