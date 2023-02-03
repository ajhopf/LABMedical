import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Pacient } from "../../shared/models/pacient.model";
import { Appointment } from "../../shared/models/appointment.model";
import { Exam } from "../../shared/models/exam.model";

@Component({
  selector: 'app-records-listing',
  templateUrl: './records-listing.component.html',
  styleUrls: ['./records-listing.component.css']
})
export class RecordsListingComponent implements OnInit{
  pacients: Pacient[]
  appointments: Appointment[]
  exams: Exam[]
  filteredPacients = []

  constructor(
    private pacientFilterService: FilterPacientsService,
    private pacientsDB: PacientsDbService,
    private appointmentsDB: AppointmentsDbService,
    private examsDB: ExamsDbService,
    private router: Router
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      (pacientsList: Pacient[]) => this.pacients = pacientsList
    )

    this.appointmentsDB.getAppointments().subscribe(
      (appointmentList: Appointment[]) => this.appointments = appointmentList
    )

    this.examsDB.getExams().subscribe(
      (examsList: Exam[]) => this.exams = examsList
    )
  }

  filterPacients(filter: string): void {
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter, 'id')
  }

  onPacientClick(pacient): void {
    this.router.navigate([`/home/pacient-records/${pacient.id}`])
  }
}
