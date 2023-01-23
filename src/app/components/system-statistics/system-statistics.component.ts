import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";

@Component({
  selector: 'app-system-statistics',
  templateUrl: './system-statistics.component.html',
  styleUrls: ['./system-statistics.component.css']
})
export class SystemStatisticsComponent implements OnChanges{
  @Input() pacients
  pacientsNumber = 0

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.pacients) {
      for (let pacient of this.pacients) {
        this.pacientsNumber++
      }
      console.log(this.pacientsNumber)
    }
  }
}
