import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Doctor {
  name?: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorsDBService {
  BASE_URL = 'http://localhost:3000/doctors'
  constructor(private http: HttpClient) { }

  createUser(createdUser: Doctor) {
    console.log(createdUser)

    this.http.post(
      this.BASE_URL,
      createdUser
    ).subscribe(response => {
      console.log(response)
    })
  }

  getUsers() {
    return this.http.get(this.BASE_URL)
  }
}
