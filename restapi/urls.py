"""restapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from employee import views
from employee.views import LoginAPI

router = routers.DefaultRouter()
router.register(r'jobs', views.JobViewset)
router.register(r'machines', views.MachineViewset)
router.register(r'timecard', views.TimecardViewset)
router.register(r'jobentries', views.JobEntryViewset)
router.register(r'machineentries', views.MachineEntryViewset)
path('r^login', LoginAPI.as_view, name='login'),

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
]
