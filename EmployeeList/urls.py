from django.conf.urls import url
from django.urls import path
from knox import views as knox_views
from EmployeeList import views
from EmployeeList.views import RegisterAPI, LoginAPI

urlpatterns = [
    url(r'^api/employees$', views.employee_list),
    url(r'^api/employees/(?P<pk>[0-9]+)$', views.employee_detail),
    url(r'^api/employees/published$', views.employee_list_published),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
]
