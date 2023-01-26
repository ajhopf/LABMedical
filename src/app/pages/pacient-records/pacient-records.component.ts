import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

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
  pacientsAppointments: Appointment[] = []
  pacientsExams: Exam[] = []

  constructor(
    private route: ActivatedRoute,
    private pacientsDB: PacientsDbService,
    private appointmentsDB: AppointmentsDbService,
    private examsDB: ExamsDbService
  ) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']

    if (this.userId) {
      this.pacientsDB.getPacient(this.userId).subscribe((pacient: Pacient) => {
        this.pacient = pacient
        console.log(this.pacient)
      })
    }

    this.appointmentsDB.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        let pacientAppointments = appointments.filter(appointment => appointment['pacientId'] === +this.userId)
        this.pacientsAppointments = [...pacientAppointments]
        console.log(this.pacientsAppointments)
      }
    )

    this.examsDB.getExams().subscribe(
      (exams: Exam[]) => {
        let pacientExams = exams.filter(exam => exam['pacientId'] === +this.userId)
        this.pacientsExams = [...pacientExams]
        console.log(this.pacientsExams)
      }
    )
  }
}
