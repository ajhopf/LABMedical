import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pacient } from "../models/pacient.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PacientsDbService {
  BASE_URL = 'http://localhost:3000/pacients'
  constructor(private http: HttpClient) {
  }

  createPacient(newPacient: Pacient): Observable<any> {
    return this.http.post(this.BASE_URL, newPacient)
  }

  getPacients(): Observable<any> {
    return this.http.get(this.BASE_URL)
  }

  getPacient(pacientId: string): Observable<any> {
    return this.http.get(`${ this.BASE_URL }/${ +pacientId }`)
  }

  editPacient(pacient: Pacient): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${pacient.id}`, pacient)
  }

  deletePacient(pacientId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${pacientId}`)
  }
}
