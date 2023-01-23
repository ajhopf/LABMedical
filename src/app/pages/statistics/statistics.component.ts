import { Component, OnInit } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pacients
  filteredPacients = []

  constructor(
    private pacientsDB: PacientsDbService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => this.pacients = pacientsList
    )
  }

  filterPacients(event: string) {
    //filter by name
    this.filteredPacients = this.pacients.filter(pacient => pacient.identification.pacientName.toLowerCase().includes(event.toLowerCase()))
    //filter by email if no result by name
    if(this.filteredPacients.length === 0) {
      this.filteredPacients = this.pacients.filter(pacient => pacient.identification.email.includes(event))
    }
    //filter by phone if no resul by name and email
    if(this.filteredPacients.length === 0) {
      this.filteredPacients = this.pacients.filter(pacient => {
        let formattedPhone = pacient.identification.phoneNumber.replace(/[^0-9]+/g, '')

        return formattedPhone.includes(event)
      })
    }
  }

  // filterPacients(event: string) {
  //   if (this.pacientsDB.filterPacients(event)) {
  //     this.filteredPacients = this.pacientsDB.filterPacients(event)
  //   }
  // }
}
