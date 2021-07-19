import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.css'],
})
export class UpdateMachineComponent implements OnInit {
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
      this.apiService.getMachineById(this.id).subscribe((machine) => {
        this.updateForm = this.formBuilder.group({
          code: [machine.code, Validators.required],
          description: [machine.description, Validators.required],
          hourly_rent: [machine.hourly_rent, Validators.required],
          max_hrs: [machine.max_hrs, Validators.required],
        });
      });
    });
  }
  onSubmit(): void {
    const updateMachine = {
      id: this.id,
      code: this.updateForm.value['code'],
      description: this.updateForm.value['description'],
      hourly_rent: parseInt(this.updateForm.value['hourly_rent']),
      max_hrs: parseInt(this.updateForm.value['max_hrs']),
    };
    console.log(updateMachine);

    this.apiService
      .updateMachine(updateMachine)
      .subscribe((m) => this.router.navigate(['admin/machines']));
  }
  onCancel(): void {
    this.router.navigate(['admin/machines']);
  }
}
