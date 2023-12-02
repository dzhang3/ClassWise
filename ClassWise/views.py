from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.
from .models import *
from .forms import CourseForm, CreateUserForm
#from .filters import OrderFilter

def registrationPage(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,'Account was created for ' + form.cleaned_data.get('username'))
            return redirect('login')
    context = {'form':form}
    return render(request, 'ClassWise/register.html', context)

def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password1')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print("Login successful")
            return redirect('home')
        else:
            print("Login failed")
            messages.info(request, 'Username or password is incorrect')
    context = {}
    return render(request, 'ClassWise/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def home(request):
    courses = Course.objects.all()
    total_courses = courses.count()
    context = {'courses': courses}
    return render(request, 'ClassWise/search.html', context)
