import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";

@Component({
  selector: 'app-system-statistics',
  templateUrl: './system-statistics.component.html',
  styleUrls: ['./system-statistics.component.css']
})
export class SystemStatisticsComponent implements OnChanges{
  @Input() pacients
  @Input() appointments
  pacientsNumber = 0
  appointmentsNumber = 0

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pacientsNumber = 0
    this.appointmentsNumber = 0

    if(this.pacients) {
      for (let pacient of this.pacients) {
        console.log(this.pacientsNumber)
        this.pacientsNumber++
      }
    }

    if(this.appointments) {
      for (let appointment of this.appointments) {
        this.appointmentsNumber++
      }
    }
  }
}
