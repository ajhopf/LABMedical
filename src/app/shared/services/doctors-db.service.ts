import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Doctor } from "../models/doctor.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorsDBService {
  BASE_URL = 'http://localhost:3000/doctors'
  constructor(private http: HttpClient) { }

  createUser(createdUser: Doctor): void {
    console.log(createdUser)
    this.http.post(
      this.BASE_URL,
      createdUser
    ).subscribe(response => {
      console.log(response)
    })
  }

  getUsers(): Observable<any> {
    return this.http.get(this.BASE_URL)
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${userId}`)
  }
}
