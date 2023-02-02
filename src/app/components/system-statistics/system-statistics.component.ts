import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { Pacient } from "../../shared/models/pacient.model";
import { Appointment } from "../../shared/models/appointment.model";
import { Exam } from "../../shared/models/exam.model";

@Component({
  selector: 'app-system-statistics',
  templateUrl: './system-statistics.component.html',
  styleUrls: ['./system-statistics.component.css']
})
export class SystemStatisticsComponent implements OnChanges{
  @Input() pacients: Pacient[]
  @Input() appointments: Appointment[]
  @Input() exams: Exam[]
  pacientsNumber:number = 0
  appointmentsNumber: number = 0
  examsNumber: number = 0

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pacientsNumber = 0
    this.appointmentsNumber = 0
    this.examsNumber = 0

    if(this.pacients) {
      for (let pacient of this.pacients) {
        this.pacientsNumber++
      }
    }

    if(this.appointments) {
      for (let appointment of this.appointments) {
        this.appointmentsNumber++
      }
    }

    if (this.exams) {
      for (let exam of this.exams) {
        this.examsNumber++
      }
    }
  }
}
