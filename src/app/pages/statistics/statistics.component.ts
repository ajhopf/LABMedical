import { Component, OnInit } from '@angular/core';

import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Pacient } from "../../shared/models/pacient.model";
import { Appointment } from "../../shared/models/appointment.model";
import { Exam } from "../../shared/models/exam.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pacients: Pacient[]
  appointments: Appointment[]
  exams: Exam[]
  filteredPacients: Pacient[] = []

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
      (appointmentList: Appointment[]) => this.appointments = appointmentList
    )

    this.examsDB.getExams().subscribe(
      (examsList: Exam[]) => this.exams = examsList
    )
  }

  filterPacients(filter: string) {
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter)
  }
}
