import { Component, OnInit } from '@angular/core';
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";

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
