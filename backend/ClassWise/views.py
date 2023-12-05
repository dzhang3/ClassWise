from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Course
from .serializers import CourseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse # to return fully-qualified URLs; 
# converting generic views to function-based views
from rest_framework import status
# Create your views here.
from .forms import CourseForm, CreateUserForm
#from .filters import OrderFilter

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

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
        password = request.POST.get('password')
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
    if request.method == "GET":
        # user will type course code in search bar and we will scape the data from the web based on the course code
        # and store it in the database
        # TODO: see how the actual input will be given by the user
        # currently, we are hardcoding the course code
        #course_code = request.GET.get('course_code')
        course_code = 'COMP302'
        get_course_info(course_code)
        # TODO: browser is ready, now we need to scrape the data from the web

    courses = Course.objects.all()
    total_courses = courses.count()
    context = {'courses': courses}
    return render(request, 'ClassWise/search.html', context)

@login_required(login_url='login')
@api_view(['GET', 'POST'])
def course_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    # TODO: filter courses by user input
    if request.method == 'GET':
        courses = Course.objects.all()
        #courses = Course.objects.filter(author=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@login_required(login_url='login')
@api_view(['GET', 'PUT', 'DELETE'])
def course_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
def get_course_info(course_code):
    desired_user_agent = "https://www.whatismybrowser.com/detect/what-is-my-user-agent"
    # Create a ChromeOptions instance and set the user agent
    chrome_options = webdriver.ChromeOptions()
    # Path to your Chrome extension (.crx file)
    extension_path = '/Users/jaewonmoon/Downloads/JLACAIMKACNKHLCGAPGAKPKLNIBGFKDE_4_3_37_0.crx'
    # Load the extension
    chrome_options.add_extension(extension_path)
    chrome_options.add_argument(f"user-agent={desired_user_agent}")
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    # Navigate to the website
    driver.get("https://www.mcgill.ca/study/2023-2024/courses/search")

    # Find the search input field by ID and input "COMP512"
    search_input = driver.find_element(By.ID, "edit-keys")
    search_input.send_keys(course_code)

    # Find the submit button by ID and click it
    submit_button = driver.find_element(By.ID, "edit-submit")
    submit_button.click()

    # Wait for the page to load (you may need to adjust the wait time)
    driver.implicitly_wait(10)

    # Find the first row by class name
    first_row = driver.find_element(By.CLASS_NAME, "views-row-1")

    # Find the link in the first row by tag name
    link = first_row.find_element(By.TAG_NAME, "a")

    # Click the link
    link.click()

    # Find the course title by class name

    # Find the instructor by class name
    catalog_instructors = driver.find_element(By.CLASS_NAME, "catalog-instructors")
    instructor_containers = catalog_instructors.find_elements(By.CLASS_NAME, "mcen-profDiv")
    for instructor_container in instructor_containers:
        #instructor = instructor_container.find_element(By.CLASS_NAME, "mcen-profName").text
        print("instructor is...",instructor_container.text)
    # Keep the browser open until user input
    input("Press Enter to close the browser...")
    # Close the browser
    driver.quit()