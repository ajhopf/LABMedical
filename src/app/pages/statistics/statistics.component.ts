import { Component, OnInit } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";
import { FilterPacientsService } from "../../services/filter-pacients.service";
import { AppointmentsDbService } from "../../services/appointments-db.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pacients
  filteredPacients = []
  appointments

  constructor(
    private pacientsDB: PacientsDbService,
    private pacientFilterService: FilterPacientsService,
    private appointmentsDB: AppointmentsDbService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => this.pacients = pacientsList
    )
    this.appointmentsDB.getAppointments().subscribe(
      appointmentList => this.appointments = appointmentList
    )
  }

  filterPacients(filter: string) {
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter)
  }
}
