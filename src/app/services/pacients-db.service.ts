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

  getPacient(pacientId: string) {
    return this.http.get(`${this.BASE_URL}/${+pacientId}`)
  }

  // populatePacientsArray() {
  //   this.getPacients().subscribe(pacients => {
  //       this.pacients = pacients
  //       console.log(this.pacients)
  //       return this.pacients
  //     }
  //   )
  // }

}
