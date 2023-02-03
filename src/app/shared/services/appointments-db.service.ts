import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../models/appointment.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsDbService {
  BASE_URL = 'http://localhost:3000/appointments'
  constructor (private http: HttpClient) { }

  createAppointment(newAppointment: Appointment) {
    return this.http.post(this.BASE_URL, newAppointment)
  }

  getAppointments(): Observable<any> {
    return this.http.get(this.BASE_URL)
  }

  getAppointment(appointmentId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${+appointmentId}`)
  }

  getAppointmentsByUserId(pacientId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}?pacientId=${pacientId}`)
  }

  editAppointment(appointment: Appointment): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${appointment.id}`, appointment)
  }

  deleteAppointment(appointmentId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${appointmentId}`)
  }
}
