import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExamsDbService {
  BASE_URL = 'http://localhost:3000/exams'
  constructor(private http: HttpClient) { }

  createExam(newExam) {
    return this.http.post(this.BASE_URL, newExam)
  }

  getExams(){
    return this.http.get(this.BASE_URL)
  }

  getExamsByPacientId(pacientId: string) {
    return this.http.get(`${this.BASE_URL}?pacientId=${pacientId}`)
  }
}
