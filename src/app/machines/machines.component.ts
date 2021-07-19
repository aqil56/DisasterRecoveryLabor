import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  machines:any[] = [];

  constructor(private apiServ: ApiService) {}

  ngOnInit(): void {
    this.apiServ.getMachines().subscribe((machines) => (this.machines = machines));
  }

  deleteMachine(id: any) {
    this.apiServ
      .deleteMachine(id)
      .subscribe(() => (this.machines = this.machines.filter((m) => id !== m.id)));
  }

}
