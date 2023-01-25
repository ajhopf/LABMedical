import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterPacientsService {
  constructor() { }

  filterPacients(pacients, filter: string) {
    let filteredPacients
    //filter by name
    filteredPacients = pacients.filter(pacient => pacient.identification.pacientName.toLowerCase().includes(filter.toLowerCase()))
    //filter by email if no result by name
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

    return filteredPacients
  }
}
