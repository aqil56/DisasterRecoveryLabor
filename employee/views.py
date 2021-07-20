from django.shortcuts import render
from rest_framework.response import Response
from employee.serializers import DRUserSerializer, JobSerializer, MachineSerializer, JobEntrySerializer, MachineEntrySerializer, TimecardSerializer
from employee.models import Job, Machine, Timecard, JobEntry, MachineEntry, DRUser
from rest_framework import viewsets
# Create your views here.

class DRUserViewset(viewsets.ModelViewSet):
    queryset = DRUser.objects.all()
    serializer_class = DRUserSerializer

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
