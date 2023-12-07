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
from .models import Course, Instructor
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
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
    # TODO: decide if we will this as POST Method
    if request.method == "POST":
        print(request.POST)
        course_code = request.POST.get('course_code')
        #course_code = "COMP551"
        d_course_info = get_course_info(course_code)
        # check if there already exists a course with the same course code
        # if so, update the course model with the updated data
        if Course.objects.filter(course_code=course_code).exists():
            course = Course.objects.get(course_code=course_code)
            course.course_code = d_course_info['course_code']
            course.course_name = d_course_info['course_title']
            course.course_description = d_course_info['course_description']
            course.course_instructors = d_course_info['instructors']
            course.course_prerequisites = d_course_info['course_prerequisites']
            course.course_corequisites = d_course_info['course_corequisites']
            course.course_restrictions = d_course_info['course_restriction']
            course.course_offering_terms = d_course_info['course_offering_terms']
            course.course_previous_grades = d_course_info['course_previous_grades'].to_string()
            course.course_credit = d_course_info['course_credit']
        else:
            # if not, create a new course object based on the course code
            course = Course.objects.create(course_code=d_course_info['course_code'],
                                            course_name=d_course_info['course_title'], 
                                            course_description=d_course_info['course_description'], 
                                            course_instructors=d_course_info['instructors'],
                                            course_prerequisites=d_course_info['course_prerequisites'],
                                            course_corequisites=d_course_info['course_corequisites'],
                                            course_restrictions=d_course_info['course_restriction'], 
                                            course_offering_terms=d_course_info['course_offering_terms'], 
                                            course_previous_grades=d_course_info['course_previous_grades'].to_string(), 
                                            course_credit=d_course_info['course_credit'])
        course.save()
        # TODO: currently, we are only showing one course detail.
        serializer = CourseSerializer(course, many=False)
        return Response(serializer.data)
    else:
        return render(request, 'ClassWise/search.html')

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
@api_view(['GET'])
def course_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # get the updated data from the web. TODO: we might change this later.
        course_code = request.GET.get('course_code')
        d_course_info = get_course_info(course_code)
        # update the course model with the updated data
        course.course_code = d_course_info['course_code']
        course.course_name = d_course_info['course_title']
        course.course_description = d_course_info['course_description']
        course.course_instructors = d_course_info['instructors']
        course.course_prerequisites = d_course_info['course_prerequisites']
        course.course_restrictions = d_course_info['course_restriction']
        course.course_offering_terms = d_course_info['course_offering_terms']
        course.course_previous_grades = d_course_info['course_previous_grades']
        course.course_credit = d_course_info['course_credit']
        course.save()
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
    """returns a json object containing course information
    json object will look like this
    {
        "course_code": "COMP 302",
        "course_name": "Programming Languages and Paradigms",
        "course_description": "This course is an introduction to the theory of computation. Topics include finite automata and regular languages, pushdown automata and context-free languages, Turing machines, the Chomsky hierarchy, decidability, and the halting problem.",
        "instructors": [
            "Jacob Errington",
            "Max Kopinsky"
        ],
        "course_prerequisites": [
            "COMP 250",
            "MATH 240"
        ],
        "course_corequisites": [
        ],
        "course_restriction": "Not open to students who have taken or are taking COMP 250 or COMP 251.",
        "course_offering_terms": "Winter 2023",
        "course_previous_grades": [
            "2023 Winter: A-",
            "2022 Winter: A",
            "2021 Winter: A-",
            "2020 Winter: A",
        ]
    }
    """
    desired_user_agent = "https://www.whatismybrowser.com/detect/what-is-my-user-agent"
    # Create a ChromeOptions instance and set the user agent
    chrome_options = webdriver.ChromeOptions()
    # Path to your Chrome extension (.crx file)
    extension_path = '/Users/jaewonmoon/Downloads/JLACAIMKACNKHLCGAPGAKPKLNIBGFKDE_4_3_37_0.crx'
    # Load the extension
    chrome_options.add_extension(extension_path)
    chrome_options.add_argument(f"user-agent={desired_user_agent}")
    #chrome_options.add_argument("--headless")
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

    # TODO: initialize the json object based on Course model fields.
    course_json = {}
    # Find the course title by ID
    course_code_title_credit = driver.find_element(By.ID, "page-title").text.strip()
    l_course_code_title_credit = course_code_title_credit.split(" ") # ["COMP", "302", "r", "e", "s", "t"]
    course_code = ' '.join(map(str, l_course_code_title_credit[:2])) # "COMP 302"
    course_title = ' '.join(map(str, l_course_code_title_credit[2:-2])) # "r e s t"
    course_credit = l_course_code_title_credit[-2][1] # "3"
    course_json['course_code'] = course_code
    course_json['course_title'] = course_title
    course_json['course_credit'] = course_credit
    # Find the course description by ID
    course_description = driver.find_element(By.ID, "mcen-overviewContainer")
    # Find the course description by tag name
    course_description = course_description.find_element(By.TAG_NAME, "p").text
    course_json['course_description'] = course_description
    # Find the instructors by class name
    catalog_instructors = driver.find_element(By.CLASS_NAME, "catalog-instructors")
    instructors = catalog_instructors.find_elements(By.CLASS_NAME, "mcen-profDiv")
    substring_to_remove = "GoogleMercury"
    for i in range(len(instructors)):
        course_instructor = instructors[i].text
        course_instructor = course_instructor.replace(substring_to_remove, "")
        if i == 0:
            course_json['instructors'] = [course_instructor]
        else:
            course_json['instructors'].append(course_instructor)
        # check if the instructor already exists in the Instructor model
        # if so, update the instructor model with the updated data
        if Instructor.objects.filter(instructor_name=course_instructor).exists():
            instructor = Instructor.objects.get(instructor_name=course_instructor)
            instructor_rating = get_instructor_rating(course_instructor)
            instructor.instructor_rating = instructor_rating
        else:
            # if not, create a new instructor object based on the instructor name
            instructor = Instructor.objects.create(instructor_name=course_instructor,
                                                   instructor_rating=get_instructor_rating(course_instructor))
        instructor.save()
    # Find the course prerequisites, Corequisite, Restriction by Class
    course_prerequisites = driver.find_element(By.CLASS_NAME, "catalog-notes")
    # iterate through li tags and get text in p tags
    li_objects = course_prerequisites.find_elements(By.TAG_NAME, "li")
    for li_object in li_objects:
        p_objects = li_object.find_elements(By.TAG_NAME, "p")
        for p_object in p_objects:
            note = p_object
            if "Prerequisite" in note.text:
                anchor_course_prerequisites = note.find_elements(By.TAG_NAME, "a")
                for i in range(len(anchor_course_prerequisites)):
                    anchor_course_prerequisite = anchor_course_prerequisites[i]
                    course_prerequisite = anchor_course_prerequisite.text
                    if i == 0:
                        course_json['course_prerequisites'] = [course_prerequisite]
                    else:
                        course_json['course_prerequisites'].append(course_prerequisite)
            elif "Corequisite" in note.text:
                anchor_course_corequisites = note.find_elements(By.TAG_NAME, "a")
                for i in range(len(anchor_course_corequisites)):
                    anchor_course_corequisite = anchor_course_corequisites[i]
                    course_corequisite = anchor_course_corequisite.text
                    if i == 0:
                        course_json['course_corequisites'] = [course_corequisite]
                    else:
                        course_json['course_corequisites'].append(course_corequisite)
            elif "Restriction" in note.text:
                course_restriction = note.text
                course_json['course_restriction'] = course_restriction
            else:
                continue
    # Find the course offering terms by Class
    course_offering_terms = driver.find_element(By.CLASS_NAME, "catalog-terms").text
    course_json["course_offering_terms"] = course_offering_terms
    # Find the course previous grades table by Id
    course_previous_grades_table = driver.find_element(By.ID, "mcen-class-averages-content-right-table")
    # Find the course previous grades by class
    course_previous_grades = course_previous_grades_table.find_elements(By.CLASS_NAME, "mcen-class-average-row")
    for i in range(len(course_previous_grades)):
        course_previous_grade = course_previous_grades[i]
        term = course_previous_grade.find_element(By.TAG_NAME, "a").text # 2023 Winter:
        letter_grade = course_previous_grade.find_element(By.CLASS_NAME, "mcen-class-average-val").text # A-
        course_previous_grade = term + " " + letter_grade
        if i == 0:
            course_json['course_previous_grades'] = [course_previous_grade]
        else:
            course_json['course_previous_grades'].append(course_previous_grade)
    # Keep the browser open until user input
    # input("Press Enter to close the browser...")
    # Close the browser
    driver.quit()
    print(course_json)
    return course_json

def get_instructor_rating(name):
    desired_user_agent = "https://www.whatismybrowser.com/detect/what-is-my-user-agent"
    # Create a ChromeOptions instance and set the user agent
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument(f"user-agent={desired_user_agent}")
    chrome_options.add_argument("--disable-popup-blocking")
    #chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    # Navigate to the website
    print("processing...")
    # https://www.ratemyprofessors.com/school/1439
    driver.get("https://www.ratemyprofessors.com/")
    try:
        print("waiting for pop-up window")
        wait = WebDriverWait(driver, 1)
        close_button = driver.find_element(By.CLASS_NAME, 'ReactModal__Overlay')
        print("close button found: ", close_button)
        close_button1 = close_button.find_element(By.CLASS_NAME, 'FullPageModal__StyledFullPageModal-sc-1tziext-1')
        print("close button 1 found: ", close_button1)
        close_button2 = close_button1.find_element(By.CLASS_NAME, 'Buttons__Button-sc-19xdot-1')
        print("close button 2 found: ", close_button2)
        close_button2.click()
        print("close button clicked")
    except Exception as e:
        print(f"An exception occurred: {e}")
        print("No pop-up window")
    search_input = driver.find_element(By.CLASS_NAME, "Search__DebouncedSearchInput-sc-10lefvq-1 fwqnjW")
    search_input.send_keys(name)
    search_input.send_keys(Keys.RETURN)
    rating = float(driver.find_element(By.CLASS_NAME, "CardNumRating__CardNumRatingNumber-sc-17t4b9u-2 bUneqk").text)
    driver.quit()
    print("rating is", rating)
    return rating