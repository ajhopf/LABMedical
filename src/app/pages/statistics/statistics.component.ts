import { Component, OnInit } from '@angular/core';

// @ts-ignore
import { PacientsDbService } from "../../shared/services/pacients-db.service";
// @ts-ignore
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pacients
  appointments
  exams
  filteredPacients = []

  constructor(
    private pacientFilterService: FilterPacientsService,
    private pacientsDB: PacientsDbService,
    private appointmentsDB: AppointmentsDbService,
    private examsDB: ExamsDbService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => this.pacients = pacientsList
    )

    this.appointmentsDB.getAppointments().subscribe(
      appointmentList => this.appointments = appointmentList
    )

    this.examsDB.getExams().subscribe(
      examsList => this.exams = examsList
    )
  }

  filterPacients(filter: string) {
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter)
  }
}
