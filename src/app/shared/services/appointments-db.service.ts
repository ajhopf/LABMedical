import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsDbService {
  BASE_URL = 'http://localhost:3000/appointments'
  constructor(private http: HttpClient) { }

  createAppointment(newAppointment) {
    return this.http.post(this.BASE_URL, newAppointment)
  }

  getAppointments() {
    return this.http.get(this.BASE_URL)
  }

  getAppointmentsByUserId(pacientId: string) {
    return this.http.get(`${this.BASE_URL}?pacientId=${pacientId}`)
  }
}
