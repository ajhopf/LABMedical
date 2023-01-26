import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Pacient } from "../../shared/models/pacient.model";
import { Appointment } from "../../shared/models/appointment.model";
import { Exam } from "../../shared/models/exam.model";


@Component({
  selector: 'app-pacient-records',
  templateUrl: './pacient-records.component.html',
  styleUrls: ['./pacient-records.component.css']
})
export class PacientRecordsComponent implements OnInit {
  userId: string
  pacient: Pacient
  pacientRecords: (any)[] = []

  constructor(
    private route: ActivatedRoute,
    private pacientsDB: PacientsDbService,
    private appointmentsDB: AppointmentsDbService,
    private examsDB: ExamsDbService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']

    this.pacientsDB.getPacient(this.userId).subscribe(
      (pacient: Pacient) => {
      this.pacient = pacient;
      console.log(this.pacient)
      }
    )

    this.appointmentsDB.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        let pacientAppointments = appointments.filter(appointment => appointment['pacientId'] === +this.userId)
        this.pacientRecords = [...this.pacientRecords, ...pacientAppointments]
        //sorting by date
        this.pacientRecords.sort((a, b) => {
          return (+new Date(a.date)) - (+new Date(b.date))
        })
      }
    )

    this.examsDB.getExams().subscribe(
      (exams: Exam[]) => {
        let pacientExams = exams.filter(exam => exam['pacientId'] === +this.userId)
        this.pacientRecords = [...this.pacientRecords, ...pacientExams]

        //sorting by date
        this.pacientRecords.sort((a, b) => {
          return (+new Date(a.date)) - (+new Date(b.date))
        })
      }
    )
  }

  onAppointmentEdit(appointmentId: number) {
    this.router.navigate([`/home/appointment-registration/${appointmentId}`])
  }

  onExamEdit(examId: number) {
    this.router.navigate([`/home/exam-registration/${examId}`])
  }
}
