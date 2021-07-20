from django.db import models

# Create your models here.
class DRUser(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    role = models.CharField(max_length=15, choices=(('admin', 'admin'),('contractor', 'contractor')), default=(''))

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
    job = models.ForeignKey(Job, on_delete=models.DO_NOTHING)
    hrs = models.IntegerField()


class MachineEntry(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.DO_NOTHING)
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
