from rest_framework import serializers
from django.contrib.auth.models import User
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


# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    return user
