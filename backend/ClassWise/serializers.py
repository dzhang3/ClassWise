from rest_framework import serializers
from .models import Course, Instructor
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
#from django.contrib.auth.models import User

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields ='__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields ='__all__'

User = get_user_model()
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
