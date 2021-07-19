import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css'],
})
export class TimesheetsComponent implements OnInit {
  isAdmin: boolean = false;
  timecards: any[] = [];
  constructor(private apiServ: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiServ
      .getTimesheets()
      .subscribe((timecards) => {
        this.timecards = timecards;
        this.isAdmin = this.router.url.includes('/admin/')
        for (let t of this.timecards) {
          let pay = 0;
          let total_hrs = 0;
          for (let je of t.job_entries) {
            total_hrs += je.hrs;
            pay += je.hrs * je.job.hourly_rate;
          }
          let rent = 0;
          for (let me of t.machine_entries) {
            total_hrs += me.hrs;
            rent += me.machine.hourly_rent * me.hrs;
          }
          t['total_amount'] = pay - rent;
          t['total_hrs'] = total_hrs;
        }
      });
  }
  deleteTimecard(id: any) {
    this.apiServ
      .deleteTimecard(id)
      .subscribe(
        () => (this.timecards = this.timecards.filter((t) => id !== t.id))
      );
  }
}
