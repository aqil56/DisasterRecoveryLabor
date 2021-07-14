from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import ListView, DetailView, TemplateView
from rest_framework import status
from rest_framework.decorators import api_view

from EmployeeList.models import Employee


def index(request):
    return render(request, 'home.html')


class EmployeesList(ListView):  # generic view
    template_name = 'list.html'
    model = Employee
    context_object_name = 'list'


class EmployeesDetail(DetailView):  # generic view
    template_name = 'details.html'
    model = Employee
    context_object_name = 'details'
