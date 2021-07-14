from rest_framework import serializers
from EmployeeList.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
                  'firstname',
                  'lastname',
                  'salary',
                  'department')
