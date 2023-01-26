import { Component, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import { PacientsDbService } from "../../shared/services/pacients-db.service";
// @ts-ignore
import { FilterPacientsService } from "../../shared/services/filter-pacients.service";
import { ConfirmationService } from "primeng/api";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Appointment } from "../../shared/models/appointment.model";
import { Pacient } from "../../shared/models/pacient.model";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit{
  @ViewChild('newAppointment') newAppointmentForm
  pacients: Pacient[]
  filteredPacients: Pacient[]
  selectedPacient: Pacient
  isSaving: boolean
  appointmentId: string
  newAppointmentRegistration = true

  appointment: Appointment = {
    pacientId: 0,
    reason: '',
    date: new Date().toISOString().slice(0,10),
    // time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    time: new Date().toLocaleTimeString().slice(0,5),
    description: '',
    medication: '',
    dosageAndPrecautions: ''
  }

  constructor(
    private pacientsDB: PacientsDbService,
    private filterPacientsService: FilterPacientsService,
    private confirmationService: ConfirmationService,
    private appointmentsDB: AppointmentsDbService,
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
      this.appointmentId = this.route.snapshot.params['id']
      this.appointmentsDB.getAppointment(this.appointmentId).subscribe(
        (appointment: Appointment) => {
          this.appointment = appointment

          this.pacientsDB.getPacient(appointment.pacientId.toString())
            .subscribe((pacient: Pacient) => {
              this.selectedPacient = pacient
              this.newAppointmentRegistration = false
            })
        }
      )
    }
  }

  filterPacients(filter: string) {
    if (filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = []
    }
  }

  onSelectPacient(pacient) {
    console.log(pacient.id)

    this.filteredPacients = []
    this.appointment.pacientId = pacient.id
    this.selectedPacient = pacient
  }

  onFormSubmit(){
    let confirmationMessage = `<pre>
    <strong>Motivo:</strong> ${this.appointment.reason}\n
    <strong>Data e hora:</strong> ${this.appointment.date} / ${this.appointment.time}\n
    <strong>Descrição:</strong> ${this.appointment.description}\n
    <strong>Medicação:</strong> ${this.appointment.medication ? this.appointment.medication : 'Sem medicação'}
    <strong>Dosagem e Precauções:</strong> ${this.appointment.dosageAndPrecautions}`

    this.confirmationService.confirm({
      message: confirmationMessage,
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.appointmentsDB.createAppointment(this.appointment).subscribe(
            createdAppointment => {
              alert('Consulta adicionada com sucesso!')
              this.isSaving = false
              this.newAppointmentForm.reset()
            },
            error => {
              alert('Consulta não foi adicionada ao banco de Dados! Motivo: ' + error.message)
              this.isSaving = false
            }
          )
        }, 1500)
      }
    })
  }

  onEditAppointment(){
    this.appointmentsDB.editAppointment(this.appointment).subscribe(
      response => console.log(response)
    )
  }

  onDeleteAppointment(){
    this.confirmationService.confirm({
      message: `<pre>
      Você está prestes a deletar a consulta de ${this.selectedPacient.identification.pacientName}\n
      Confirmar deleção?</pre>`,
      header: 'Deletar consulta',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.appointmentsDB.deleteAppointment(this.appointmentId).subscribe(
            createdExam => {
              alert('Consulta deletada com sucesso!')
              this.isSaving = false
              this.router.navigate(['/home/appointment-registration'])
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
