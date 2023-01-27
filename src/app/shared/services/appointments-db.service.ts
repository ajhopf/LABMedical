import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../models/appointment.model";

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

  getAppointment(appointmentId: string) {
    return this.http.get(`${this.BASE_URL}/${+appointmentId}`)
  }

  getAppointmentsByUserId(pacientId: string) {
    return this.http.get(`${this.BASE_URL}?pacientId=${pacientId}`)
  }

  editAppointment(appointment: Appointment) {
    return this.http.put(`${this.BASE_URL}/${appointment.id}`, appointment)
  }

  deleteAppointment(appointmentId: string) {
    return this.http.delete(`${this.BASE_URL}/${appointmentId}`)
  }
}
