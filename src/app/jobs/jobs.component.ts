import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];

  constructor(private apiServ: ApiService) {}

  ngOnInit(): void {
    this.apiServ.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }
  deleteJob(id: any) {
    this.apiServ
      .deleteJob(id)
      .subscribe(() => (this.jobs = this.jobs.filter((j) => id !== j.id)));
  }
}
