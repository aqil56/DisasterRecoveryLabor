import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  jobForm = this.formBuilder.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    hourly_rate: ['', Validators.required],
    max_hrs: ['', Validators.required],
  });
  ngOnInit(): void {}
  get f(){
    return this.jobForm.controls;
  }
  onSubmit(): void {
    const newJob = {
      code: this.jobForm.value['code'],
      description: this.jobForm.value['description'],
      hourly_rate: this.jobForm.value['hourly_rate'],
      max_hrs: this.jobForm.value['max_hrs'],
    };

    this.apiService
      .addJob(newJob)
      .subscribe((j) => this.router.navigate(['admin/jobs']));
    this.jobForm.value['code'] = '';
    this.jobForm.value['description'] = '';
    this.jobForm.value['hourly_rate'] = '';
    this.jobForm.value['max_hrs'] = '';
  }
  onCancel() {
    this.router.navigate(['/admin/jobs']);
  }
}
