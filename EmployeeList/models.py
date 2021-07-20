from django.db import models

# Create your models here.
CATEGORY_CHOICES = (
    (1, '---'),
    (2, 'Finalized'),
    (3, 'Open'),
)


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


class JobCodeManagement(models.Model):
    jobcode = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=200)
    hourlyrate = models.DecimalField(decimal_places=2, max_digits=4)
    maxhours = models.IntegerField()

    def publish(self):
        self.save()

    def __str__(self):
        return self.jobcode


class MachineManagement(models.Model):
    machinecode = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=200)
    hourlyrate = models.DecimalField(decimal_places=2, max_digits=4)
    maxhours = models.IntegerField()

    def publish(self):
        self.save()

    def __str__(self):
        return self.machinecode


class TimecardApproval(models.Model):
    sitecode = models.CharField(max_length=200, primary_key=True)
    contractorname = models.CharField(max_length=200)
    totalamount = models.DecimalField(decimal_places=2, max_digits=4)
    totalhours = models.IntegerField()
    approval = models.CharField(max_length=255, choices=CATEGORY_CHOICES, default="---")

    def publish(self):
        self.save()

    def __str__(self):
        return self.sitecode


class TimecardSubmission(models.Model):
    sitecode = models.CharField(max_length=200, primary_key=True)
    contractorname = models.CharField(max_length=200)
    totalamount = models.DecimalField(decimal_places=2, max_digits=4)
    totalhours = models.IntegerField()
    choice = TimecardApproval.approval

    def publish(self):
        self.save()

    def __str__(self):
        return self.sitecode


class NewTimecard(models.Model):
    sitecode = models.CharField(max_length=200)
    contractorname = models.CharField(max_length=200)
    date = models.DateField()
    laborcode = models.ForeignKey(JobCodeManagement, null=False, on_delete=models.CASCADE)
    totalamount = models.DecimalField(decimal_places=2, max_digits=4)
    totalhours = models.IntegerField()
    machinecode = models.CharField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.sitecode
