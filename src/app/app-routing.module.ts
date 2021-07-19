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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'machines', component: MachinesComponent },
      { path: 'addjob', component: AddJobComponent },
      { path: 'addmachine', component: AddMachineComponent },
      { path: 'updatemachine/:id', component: UpdateMachineComponent },
      { path: 'updatejob/:id', component: UpdateJobComponent },
      { path: 'timesheets', component: TimesheetsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
