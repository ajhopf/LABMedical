import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ConfirmationService } from "primeng/api";

import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Exam } from "../../shared/models/exam.model";
import { Pacient } from "../../shared/models/pacient.model";

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css']
})
export class ExamRegistrationComponent implements OnInit{
  @ViewChild('newExam') newExamForm: NgForm
  pacients: Pacient[]
  filteredPacients: Pacient[]
  selectedPacient: Pacient
  isSaving: boolean
  examId: string
  newExamRegistration: boolean = true
  clearSearch: boolean = false

  exam: Exam = {
    pacientId: 0,
    examName: '',
    date: new Date().toISOString().slice(0,10),
    time: new Date().toLocaleTimeString('pt-BR', {timeZone: 'UTC'}).slice(0,5),
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pacientsDB.getPacients().subscribe(
      pacientsList => {
        this.pacients = pacientsList;
      }
    )

    if (this.route.snapshot.params['id']) {
      this.examId = this.route.snapshot.params['id']
      this.examsDB.getExam(this.examId).subscribe(
        (exam: Exam) => {
          this.exam = exam

          this.pacientsDB.getPacient(exam.pacientId.toString())
            .subscribe((pacient: Pacient) => {
              this.selectedPacient = pacient
              this.newExamRegistration = false
            })
        }
      )
    }
  }

  filterPacients(filter: string): void {
    if (filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = []
    }
  }

  onSelectPacient(pacient): void {
    this.filteredPacients = []
    this.exam.pacientId = pacient.id
    this.selectedPacient = pacient
    this.clearSearch = true;
    //remove clear search=true to enable another search
    setTimeout(() => this.clearSearch = false, 300)
  }

  generateConfirmationMessage(): string {
    return `<pre>
    <strong>Nome do Exame:</strong> ${ this.exam.examName }\n
    <strong>Data e hora:</strong> ${ new Date(this.exam.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) } / ${ this.exam.time }\n
    <strong>Tipo do Exame:</strong> ${ this.exam.examType }\n
    <strong>Url do Exame:</strong> ${ this.exam.examUrl ? this.exam.examUrl : 'Sem link para exame' }\n
    <strong>Resultado do Exame:</strong> ${ this.exam.examResult }\n
    `
  }

  onFormSubmit(): void {
    this.confirmationService.confirm({
      message: this.generateConfirmationMessage(),
      header: 'Confirme as informações do exame',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.examsDB.createExam(this.exam).subscribe(
            () => {
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

  onEditExam(): void {
     this.confirmationService.confirm({
      message: this.generateConfirmationMessage() + 'Confirmar Edição?',
      header: 'Confirme as informações para editar o exame',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.examsDB.editExam(this.exam).subscribe(
            () => {
              alert('Exame atualizado com sucesso!')
              this.isSaving = false
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

  onDeleteExam(): void {
    this.confirmationService.confirm({
      message: `<pre>
      Você está prestes a deletar o exame ${this.exam.examName} de ${this.selectedPacient.identification.pacientName}\n
      Confirmar deleção?</pre>`,
      header: 'Deletar exame',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.examsDB.deleteExam(this.examId).subscribe(
            () => {
              alert('Exame deletado com sucesso!')
              this.isSaving = false
              this.router.navigate(['/home/exam-registration'])
            },
            error => {
              alert('Exame não foi deletado do banco de Dados! Motivo: ' + error.message)
              this.isSaving = false
            }
          )
        }, 1500)
      }
    })
  }

}
