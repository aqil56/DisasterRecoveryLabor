import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css'],
})
export class TimecardComponent implements OnInit {
  isAdmin: boolean = false;
  id: any;
  timecard: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.id = id;
      this.apiService.getTimecardById(this.id).subscribe((timecard) => {
        this.timecard = timecard;
        this.isAdmin = this.router.url.includes('/admin/');
      });
    });
  }
  finalize() {
    this.timecard['status'] = 'Finalized';
    this.apiService
      .updateTimecard(this.timecard)
      .subscribe((t) => this.router.navigate(['admin/timecard_approval']));
  }
  goBack() {
    if (this.isAdmin) {
      this.router.navigate(['admin/timecard_approval']);
    } else {
      this.router.navigate(['home/timecard_submission'])
    }
  }
}
