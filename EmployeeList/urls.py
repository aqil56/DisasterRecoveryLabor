from django.conf.urls import url
from EmployeeList import views

urlpatterns = [
    url(r'^api/employees$', views.employee_list),
    url(r'^api/employees/(?P<pk>[0-9]+)$', views.employee_detail),
    url(r'^api/employees/published$', views.employee_list_published)
]
