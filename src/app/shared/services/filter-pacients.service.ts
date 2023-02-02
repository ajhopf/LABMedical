import { Injectable } from '@angular/core';
import { Pacient } from "../models/pacient.model";

@Injectable({
  providedIn: 'root'
})
export class FilterPacientsService {
  constructor() { }

  filterPacients(pacients: Pacient[], filter: string, filterBy?: string): Pacient[] {
    let filteredPacients
    //filter by name
    filteredPacients = pacients.filter(pacient => pacient.identification.pacientName.toLowerCase().includes(filter.toLowerCase()))
    //filter by email if no result by name
    if(filterBy === 'id') {
      if(filteredPacients.length === 0) {
        filteredPacients = pacients.filter(pacient => pacient.id === +filter)
      }
    }

    if(!filterBy) {
      if (filteredPacients.length === 0) {
        filteredPacients = pacients.filter(pacient => pacient.identification.email.includes(filter))
      }
      //filter by phone if no resul by name and email
      if(filteredPacients.length === 0) {
        filteredPacients = pacients.filter(pacient => {
          let formattedPhone = pacient.identification.phoneNumber.replace(/[^0-9]+/g, '')

          return formattedPhone.includes(filter)
        })
      }
    }

    return filteredPacients
  }
}
