from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', views.prepopulate_database, name="home"),
    path('courses/', views.course_list, name="course-list"),
    path('courses/<str:course_code>/', views.course_detail, name="course-detail"),
    path('instructors/<str:instructor_name>/', views.instructor_detail, name="instructor-detail"),
    path('comments/<str:course_code>/', views.comment_list, name="comment-list"),
    path('comments/<int:pk>/', views.comment_detail, name="comment-detail"),
]

# We don't necessarily need to add these extra url patterns in, but it gives us a simple,
# clean way of referring to a specific format.
urlpatterns = format_suffix_patterns(urlpatterns)