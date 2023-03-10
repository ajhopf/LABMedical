import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pacient } from "../models/pacient.model";
import { Exam } from "../models/exam.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamsDbService {
  BASE_URL = 'http://localhost:3000/exams'
  constructor(private http: HttpClient) { }

  createExam(newExam: Exam): Observable<any> {
    return this.http.post(this.BASE_URL, newExam)
  }

  getExams(): Observable<any>{
    return this.http.get(this.BASE_URL)
  }

  getExam(examId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${+examId}`)
  }

  getExamsByPacientId(pacientId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}?pacientId=${pacientId}`)
  }

  editExam (exam: Exam) {
    return this.http.put(`${this.BASE_URL}/${exam.id}`, exam)
  }

  deleteExam (examId: string) {
    return this.http.delete(`${this.BASE_URL}/${examId}`)
  }
}
