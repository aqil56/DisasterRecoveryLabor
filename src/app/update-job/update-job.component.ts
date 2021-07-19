import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css'],
})
export class UpdateJobComponent implements OnInit {
  id: any;
  updateForm: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.id = id;
      this.apiService.getJobById(this.id).subscribe((job) => {
        this.updateForm = this.formBuilder.group({
          code: [job.code, Validators.required],
          description: [job.description, Validators.required],
          hourly_rate: [job.hourly_rate, Validators.required],
          max_hrs: [job.max_hrs, Validators.required],
        });
      });
    });
  }
  onSubmit(): void {
    const updateJob = {
      id: this.id,
      code: this.updateForm.value['code'],
      description: this.updateForm.value['description'],
      hourly_rate: parseInt(this.updateForm.value['hourly_rate']),
      max_hrs: parseInt(this.updateForm.value['max_hrs']),
    };
    console.log(updateJob);

    this.apiService
      .updateJob(updateJob)
      .subscribe((j) => this.router.navigate(['admin/jobs']));
  }
  onCancel(): void {
    this.router.navigate(['admin/jobs']);
  }
}
