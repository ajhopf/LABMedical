import { Component, OnInit } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";
import { FilterPacientsService } from "../../services/filter-pacients.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pacients
  filteredPacients = []

  constructor(
    private pacientsDB: PacientsDbService,
    private pacientFilterService: FilterPacientsService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => this.pacients = pacientsList
    )
  }

  filterPacients(filter: string) {
    this.filteredPacients = this.pacientFilterService.filterPacients(this.pacients, filter)
  }
}
