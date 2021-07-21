import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MachinesComponent } from './machines/machines.component';
import { AddJobComponent } from './add-job/add-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { AddMachineComponent } from './add-machine/add-machine.component';
import { UpdateMachineComponent } from './update-machine/update-machine.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { TimecardComponent } from './timecard/timecard.component';
import { AddTimecardComponent } from './add-timecard/add-timecard.component';
import { LoginComponent } from './login/login.component';
import { ContractorGuard } from './services/contractor.guard';
import { AdminGuard } from './services/admin.guard';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: AddUserComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ContractorGuard],
    canActivateChild: [ContractorGuard],
    children: [
      { path: 'timecard_submission', component: TimesheetsComponent },
      { path: 'timecard_open/:id', component: TimecardComponent },
      { path: 'addtimecard', component: AddTimecardComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'machines', component: MachinesComponent },
      { path: 'addjob', component: AddJobComponent },
      { path: 'addmachine', component: AddMachineComponent },
      { path: 'updatemachine/:id', component: UpdateMachineComponent },
      { path: 'updatejob/:id', component: UpdateJobComponent },
      { path: 'timecard_approval', component: TimesheetsComponent },
      { path: 'timecard_finalize/:id', component: TimecardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
