import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PacientsDbService {
  pacients
  BASE_URL = 'http://localhost:3000/pacients'
  constructor(private http: HttpClient) {
  }

  createPacient(newPacient) {
    return this.http.post(this.BASE_URL, newPacient)
  }

  getPacients() {
    return this.http.get(this.BASE_URL)
  }

  populatePacientsArray() {
    this.getPacients().subscribe(pacients => {
        this.pacients = pacients
        console.log(this.pacients)
        return this.pacients
      }
    )
  }

  // filterPacients(event: string) {
  //   let pacientsArray = this.getPacients().subscribe(pacients => {
  //     this.pacients = pacients
  //     let filteredArray = []
  //
  //     filteredArray = this.pacients.filter(pacient => pacient.identification.pacientName.toLowerCase().includes(event.toLowerCase()))
  //
  //     if (filteredArray.length === 0) {
  //       filteredArray = this.pacients.filter(pacient => pacient.identification.email.includes(event))
  //     }
  //
  //     if (filteredArray.length === 0) {
  //       filteredArray = this.pacients.filter(pacient => {
  //         let formattedPhone = pacient.identification.phoneNumber.replace(/[^0-9]+/g, '')
  //         return formattedPhone.includes(event)
  //       })
  //     }
  //
  //     return filteredArray
  //   })
  //
  // }

    //filter by name
    // this.filteredPacients = this.pacients.filter(pacient => pacient.identification.pacientName.toLowerCase().includes(event.toLowerCase()))
    // //filter by email if no result by name
    // if(this.filteredPacients.length === 0) {
    //   this.filteredPacients = this.pacients.filter(pacient => pacient.identification.email.includes(event))
    // }
    // //filter by phone if no resul by name and email
    // if(this.filteredPacients.length === 0) {
    //   this.filteredPacients = this.pacients.filter(pacient => {
    //     let formattedPhone = pacient.identification.phoneNumber.replace(/[^0-9]+/g, '')
    //
    //     return formattedPhone.includes(event)
    //   })
    // }

}
