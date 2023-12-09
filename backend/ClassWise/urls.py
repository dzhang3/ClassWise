from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('registration/', views.registrationPage, name="registration"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('', views.home, name="home"),
    # TODO: change like below
    #path('search/<str:course_code>/', views.search, name="search"),
    path('courses/', views.course_list, name="course-list"),
    path('courses/<int:pk>/', views.course_detail, name="course-detail"),
    #path('users/', views.user_list, name="user-list"),
    #path('users/<int:pk>/', views.user_detail, name="user-detail"),
]

# We don't necessarily need to add these extra url patterns in, but it gives us a simple,
# clean way of referring to a specific format.
urlpatterns = format_suffix_patterns(urlpatterns)