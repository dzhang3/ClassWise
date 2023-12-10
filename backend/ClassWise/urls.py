from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('registration/', views.registrationPage, name="registration"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('', views.prepopulate_database, name="home"),
    #path('class/<str:course_code>/', views.home, name="course-search"),
    path('courses/', views.course_list, name="course-list"),
    path('courses/<int:pk>/', views.course_detail, name="course-detail"),
    path('test/', views.test_view, name="test"),
    ]

# We don't necessarily need to add these extra url patterns in, but it gives us a simple,
# clean way of referring to a specific format.
urlpatterns = format_suffix_patterns(urlpatterns)