import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css'],
})
export class AddMachineComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  machineForm = this.formBuilder.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    hourly_rent: ['', Validators.required],
    max_hrs: ['', Validators.required],
  });
  ngOnInit(): void {}
  onSubmit(): void {
    const newMachine = {
      code: this.machineForm.value['code'],
      description: this.machineForm.value['description'],
      hourly_rent: parseInt(this.machineForm.value['hourly_rent']),
      max_hrs: parseInt(this.machineForm.value['max_hrs']),
    };

    this.apiService
      .addMachine(newMachine)
      .subscribe((m) => this.router.navigate(['admin/machines']));
    this.machineForm.value['code'] = '';
    this.machineForm.value['description'] = '';
    this.machineForm.value['hourly_rent'] = '';
    this.machineForm.value['max_hrs'] = '';
  }
  onCancel() {
    this.router.navigate(['/admin/machines']);
  }
}
