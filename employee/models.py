from django.db import models


# Create your models here.
class User(models.Model):
  username = models.CharField(max_length=200)
  email = models.CharField(max_length=200)

  def publish(self):
    self.save()

  def __str__(self):
    return self.username


class Job(models.Model):
  code = models.CharField(max_length=30)
  description = models.CharField(max_length=30)
  hourly_rate = models.IntegerField(null=True)
  max_hrs = models.IntegerField(null=True)

  def __str__(self):
    return self.code


class Machine(models.Model):
  code = models.CharField(max_length=30)
  description = models.CharField(max_length=30)
  hourly_rent = models.IntegerField(null=True)
  max_hrs = models.IntegerField(null=True)

  def __str__(self):
    return self.code


class JobEntry(models.Model):
  job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True)
  hrs = models.IntegerField()


class MachineEntry(models.Model):
  machine = models.ForeignKey(Machine, on_delete=models.SET_NULL, null=True)
  hrs = models.IntegerField()


class Timecard(models.Model):
  code = models.CharField(max_length=30)
  contractor = models.CharField(max_length=30)
  date = models.DateField(null=True)
  job_entries = models.ManyToManyField(JobEntry)
  machine_entries = models.ManyToManyField(MachineEntry)
  status = models.CharField(max_length=30, default='pending')

  def __str__(self):
    return self.code
