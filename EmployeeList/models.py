from django.db import models


# Create your models here.
class Employee(models.Model):
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    salary = models.DecimalField(decimal_places=3, max_digits=10)
    department = models.CharField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.firstname


class User(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.username

