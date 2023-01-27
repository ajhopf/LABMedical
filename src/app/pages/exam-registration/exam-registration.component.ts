import { Component, OnInit, ViewChild } from '@angular/core';
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { ConfirmationService } from "primeng/api";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Exam } from "../../shared/models/exam.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Pacient } from "../../shared/models/pacient.model";

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
  examId
  newExamRegistration = true

  exam: Exam = {
    pacientId: 0,
    examName: '',
    date: new Date().toISOString().slice(0,10),
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
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

  filterPacients(filter: string) {
    if (filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = ''
    }
  }

  onSelectPacient(pacient) {
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

  onEditExam() {
    let confirmationMessage = `<pre>
    <strong>Nome do Exame:</strong> ${ this.exam.examName }\n
    <strong>Data e hora:</strong> ${ this.exam.date } / ${ this.exam.time }\n
    <strong>Tipo do Exame:</strong> ${ this.exam.examType }\n
    <strong>Url do Exame:</strong> ${ this.exam.examUrl || 'Sem link para exame' }\n
    <strong>Resultado do Exame:</strong> ${ this.exam.examResult }\n\n
    
    Confirmar edição?
    `

    this.confirmationService.confirm({
      message: confirmationMessage,
      header: 'Editar Exame',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.examsDB.editExam(this.exam).subscribe(
            createdExam => {
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

  onDeleteExam() {
    this.confirmationService.confirm({
      message: `<pre>
      Você está prestes a deletar o exame ${this.exam.examName} de ${this.selectedPacient.identification.pacientName}\n
      Confirmar deleção?</pre>`,
      header: 'Deletar exame',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.examsDB.deleteExam(this.examId).subscribe(
            createdExam => {
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
