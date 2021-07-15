from rest_framework import serializers
from EmployeeList.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
                  'id',
                  'firstname',
                  'lastname',
                  'salary',
                  'department')
