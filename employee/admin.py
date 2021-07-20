from django.contrib import admin
from employee.models import Job, User, Machine, Timecard, JobEntry, MachineEntry

# Register your models here.
admin.site.register(Job)
admin.site.register(Machine)
admin.site.register(Timecard)
admin.site.register(JobEntry)
admin.site.register(MachineEntry)
admin.site.register(User)