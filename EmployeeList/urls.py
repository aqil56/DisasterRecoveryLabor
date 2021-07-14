from django.conf.urls import url
from django.urls import path
from EmployeeList import views

app_name = 'employeeserviceapi'

# #URLPatterns for function based views
urlpatterns = [

    path('home/', views.index, name='home'),
    path('list/', views.EmployeesList.as_view(), name='list'),
    path('details/', views.EmployeesDetail.as_view(), name='details'),

]
