from rest_framework import serializers

from employee.models import Job, Machine, Timecard, JobEntry, MachineEntry


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class TimecardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timecard
        fields = '__all__'
        depth = 2


class JobEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobEntry
        fields = '__all__'


class MachineEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineEntry
        fields = '__all__'
