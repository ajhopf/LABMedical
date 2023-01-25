import { Component, OnInit } from '@angular/core';

import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-records-listing',
  templateUrl: './records-listing.component.html',
  styleUrls: ['./records-listing.component.css']
})
export class RecordsListingComponent implements OnInit{
  pacients
  appointments
  exams
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
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter, 'id')
  }

  onPacientClick(pacient) {
    console.log(pacient)
    this.router.navigate([`/home/pacient-records/${pacient.id}`])
  }
}
