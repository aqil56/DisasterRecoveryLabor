from django.db import models

# Create your models here.


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
    hourly_rate = models.IntegerField(null=True)
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

    def __str__(self):
        return self.code
