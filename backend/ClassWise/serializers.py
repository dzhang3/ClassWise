from rest_framework import serializers
from .models import Course
#from django.contrib.auth.models import User

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields ='__all__'