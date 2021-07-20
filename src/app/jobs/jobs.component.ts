import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];
  user = '';
  isAdmin : boolean= false;

  constructor(private apiServ: ApiService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.apiServ.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }
  deleteJob(job: any) {
    this.apiServ
      .deleteJob(job.id)
      .subscribe(() => (this.jobs = this.jobs.filter((j) => job.id !== j.id)));
  }
}
