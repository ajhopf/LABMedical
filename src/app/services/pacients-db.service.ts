import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class PacientsDbService {
  BASE_URL = 'http://localhost:3000/pacients'
  constructor(private http: HttpClient) { }

  createPacient(newPacient) {
    // this.http.post(this.BASE_URL, newPacient).subscribe(createdPacient => console.log(createdPacient))
    return this.http.post(this.BASE_URL, newPacient)
  }
}
