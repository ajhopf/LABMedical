import { Component, OnInit, ViewChild } from '@angular/core';
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { ConfirmationService } from "primeng/api";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css']
})
export class ExamRegistrationComponent implements OnInit{
  @ViewChild('newExam') newExamForm
  pacients
  filteredPacients
  selectedPacient
  isSaving

  exam = {
    pacientId: '',
    examName: '',
    date: new Date().toISOString().slice(0,10),
    // date: new Date().toLocaleDateString(),
    //time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    time: new Date().toLocaleTimeString().slice(0,5),
    examType: '',
    examLab: '',
    examUrl: '',
    examResult: ''
  }

  constructor(
    private pacientsDB: PacientsDbService,
    private examsDB: ExamsDbService,
    private filterPacientsService: FilterPacientsService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => {
        this.pacients = pacientsList;
      }
    )
  }

  filterPacients(filter: string) {
    console.log(filter)
    console.log(this.pacients)
    if (filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = ''
    }
  }

  onSelectPacient(pacient) {
    console.log(pacient.id)
    this.filteredPacients = ''
    this.exam.pacientId = pacient.id
    this.selectedPacient = pacient
  }

  onFormSubmit() {
    let confirmationMessage = `<pre>
    <strong>Nome do Exame:</strong> ${ this.exam.examName }\n
    <strong>Data e hora:</strong> ${ this.exam.date } / ${ this.exam.time }\n
    <strong>Tipo do Exame:</strong> ${ this.exam.examType }\n
    <strong>Url do Exame:</strong> ${ this.exam.examUrl ? this.exam.examUrl : 'Sem link para exame' }\n
    <strong>Resultado do Exame:</strong> ${ this.exam.examResult }
    `

    this.confirmationService.confirm({
      message: confirmationMessage,
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          console.log(this.exam)
          this.examsDB.createExam(this.exam).subscribe(
            createdExam => {
              alert('Exame adicionado com sucesso!')
              this.isSaving = false
              this.newExamForm.reset()
            },
            error => {
              alert('Exame não foi adicionada ao banco de Dados! Motivo: ' + error.message)
              this.isSaving = false
            }
          )
        }, 1500)
      }
    })
  }
}
