import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-timecard',
  templateUrl: './add-timecard.component.html',
  styleUrls: ['./add-timecard.component.css'],
})
export class AddTimecardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}
  public timecardForm: any;
  jobs: any[] = [];
  machines: any[] = [];
  jobEntries: any = [];
  machineEntries: any = [];

  ngOnInit() {
    this.timecardForm = this.fb.group({
      code: ['', Validators.required],
      contractor: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', Validators.required],
      job_entries: this.fb.array([this.jobEntryRow()]),
      machine_entries: this.fb.array([this.machineEntryRow()]),
    });
    this.apiService
      .getMachines()
      .subscribe((machines) => (this.machines = machines));
    this.apiService.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }
  get f(){
    return this.timecardForm.controls;
  }
  get jobEntriesArr() {
    return this.timecardForm.get('job_entries') as FormArray;
  }
  get machineEntriesArr() {
    return this.timecardForm.get('machine_entries') as FormArray;
  }

  jobEntryRow() {
    return this.fb.group({
      job: ['', Validators.required],
      hrs: ['', Validators.required],
    });
  }
  machineEntryRow() {
    return this.fb.group({
      machine: ['', Validators.required],
      hrs: ['', Validators.required],
    });
  }
  addJobRow() {
    this.jobEntriesArr.push(this.jobEntryRow());
  }

  deleteJobRow(index: number) {
    this.jobEntriesArr.removeAt(index);
  }
  addMachineRow() {
    this.machineEntriesArr.push(this.machineEntryRow());
  }

  deleteMachineRow(index: number) {
    this.machineEntriesArr.removeAt(index);
  }

  onSubmit() {
    // function getEntries(timecardForm: any, apiService: any) {
    //   return new Promise((resolve) => {
    //     let jobEntries: any = [];
    //     if (timecardForm.value.job_entries.values().length > 0) {
    //       for (let j of timecardForm.value.job_entries.values()) {
    //         apiService
    //           .addJobEntry(j)
    //           .subscribe((je: any) => jobEntries.push({ id: je.id }));
    //       }
    //     }
    //     let machineEntries: any = [];
    //     if (timecardForm.value.machine_entries.values().length > 0) {
    //       for (let m of timecardForm.value.machine_entries.values()) {
    //         apiService
    //           .addMachineEntry(m)
    //           .subscribe((me: any) => machineEntries.push({ id: me.id }));
    //       }
    //     }
    //     resolve({ job: jobEntries, machine: machineEntries });
    //   });
    // }
    for (let j of this.timecardForm.value.job_entries.values()) {
      const jobObj = {
        hrs: j.hrs,
        job: j.job,
      };
      this.apiService.addJobEntry(jobObj).subscribe((je) => {
        this.jobEntries.push({ id: je.id });
        for (let m of this.timecardForm.value.machine_entries.values()) {
          const machineObj = { 
            hrs : m.hrs, 
            machine: m.machine
          }
          this.apiService.addMachineEntry(machineObj).subscribe((me) => {
            this.machineEntries.push({ id: me.id });
            const year = this.timecardForm.value.date.getFullYear();
            const month = this.timecardForm.value.date.getMonth();
            const date = this.timecardForm.value.date.getDate();
            const formattedDate = `${year}-${month}-${date}`;
            const newTimecard = {
              code: this.timecardForm.value.code,
              contractor: this.timecardForm.value.contractor,
              date: formattedDate,
              job_entries: this.jobEntries,
              machine_entries: this.machineEntries,
            };
            this.apiService
              .addTimecard(newTimecard)
              .subscribe((t) =>
                this.router.navigate(['/home/timecard_submission/'])
              );
          });
        }
      });
    }

    // async function asyncAdd(timecardForm: any, apiService: any, router: any) {
    //   const res: any = await getEntries(timecardForm, apiService);
    //   const year = timecardForm.value.date.getFullYear();
    //   const month = timecardForm.value.date.getMonth();
    //   const date = timecardForm.value.date.getDate();
    //   const formattedDate = `${year}-${month}-${date}`;
    //   const newTimecard = {
    //     code: timecardForm.value.code,
    //     contractor: timecardForm.value.contractor,
    //     date: formattedDate,
    //     job_entries: res['job'],
    //     machine_entries: res['machine'],
    //   };
    //   apiService
    //     .addTimecard(newTimecard)
    //     .subscribe((t: any) => router.navigate(['/home/timecard_submission/']));
    // }

    // asyncAdd(this.timecardForm, this.apiService, this.router);
  }
  onGoBack() {
    this.router.navigate(['home/timecard_submission']);
  }
}
