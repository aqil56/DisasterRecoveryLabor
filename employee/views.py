from django.contrib.auth import login
from django.shortcuts import render
from rest_framework.response import Response
from employee.serializers import JobSerializer, MachineSerializer, JobEntrySerializer, MachineEntrySerializer, \
  TimecardSerializer, RegisterSerializer, UserSerializer
from employee.models import Job, Machine, Timecard, JobEntry, MachineEntry
from rest_framework import viewsets, permissions, generics
from knox.auth import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer


# Create your views here.


class LoginAPI(KnoxLoginView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return super(LoginAPI, self).post(request, format=None)


# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })


class JobViewset(viewsets.ModelViewSet):
  queryset = Job.objects.all()
  serializer_class = JobSerializer


class MachineViewset(viewsets.ModelViewSet):
  queryset = Machine.objects.all()
  serializer_class = MachineSerializer


class TimecardViewset(viewsets.ModelViewSet):
  queryset = Timecard.objects.all()
  serializer_class = TimecardSerializer

  def create(self, request, *args, **kwargs):
    data = request.data
    new_timecard = Timecard.objects.create(code=data['code'], contractor=data['contractor'], date=data['date'])
    new_timecard.save()
    for entry in data['job_entries']:
      entry_obj = JobEntry.objects.get(id=entry['id'])
      new_timecard.job_entries.add(entry_obj)
    for entry in data['machine_entries']:
      entry_obj = MachineEntry.objects.get(id=entry['id'])
      new_timecard.machine_entries.add(entry_obj)
    serializer = TimecardSerializer(new_timecard)
    return Response(serializer.data)


class JobEntryViewset(viewsets.ModelViewSet):
  queryset = JobEntry.objects.all()
  serializer_class = JobEntrySerializer


class MachineEntryViewset(viewsets.ModelViewSet):
  queryset = MachineEntry.objects.all()
  serializer_class = MachineEntrySerializer
