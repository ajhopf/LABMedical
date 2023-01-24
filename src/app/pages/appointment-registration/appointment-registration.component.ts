import { Component, OnInit } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";
import { FilterPacientsService } from "../../services/filter-pacients.service";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit{
  pacients
  filteredPacients
  selectedPacient

  appointment = {
    pacientId: '',
    reason: '',
    date: new Date().toISOString().slice(0,10),
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    description: '',
    medication: '',
    dosageAndPrecautions: ''
  }

  constructor(
    private pacientsDB: PacientsDbService,
    private filterPacientsService: FilterPacientsService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => {
        this.pacients = pacientsList;
        //Retirar depois
        // this.selectedPacient = this.pacients[0]
        // console.log(this.appointment.time)
      }
    )
  }

  filterPacients(filter: string) {
    if(filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = ''
    }
  }

  onSelectPacient(pacient) {
    console.log(pacient.id)

    this.filteredPacients = ''
    this.appointment.pacientId = pacient.id
    this.selectedPacient = pacient
  }

  onFormSubmit(){
    console.log(this.appointment)
  }

}
