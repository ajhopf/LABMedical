import { Component, OnInit, ViewChild } from '@angular/core';
import { PacientsDbService } from "../../services/pacients-db.service";
import { FilterPacientsService } from "../../services/filter-pacients.service";
import { ConfirmationService } from "primeng/api";
import { AppointmentsDbService } from "../../services/appointments-db.service";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit{
  @ViewChild('newAppointment') newAppointmentForm
  pacients
  filteredPacients
  selectedPacient
  isSaving

  appointment = {
    pacientId: '',
    reason: '',
    date: new Date().toISOString().slice(0,10),
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    description: '',
    medication: '',
    dosageAndPrecautions: ''
  }

  constructor(
    private pacientsDB: PacientsDbService,
    private filterPacientsService: FilterPacientsService,
    private confirmationService: ConfirmationService,
    private appointmentsDB: AppointmentsDbService
  ) {}

  ngOnInit(){
    this.pacientsDB.getPacients().subscribe(
      pacientsList => {
        this.pacients = pacientsList;
      }
    )
  }

  filterPacients(filter: string) {
    if(filter) {
      this.filteredPacients = this.filterPacientsService.filterPacients(this.pacients, filter)
    } else {
      this.filteredPacients = ''
    }
  }

  onSelectPacient(pacient) {
    console.log(pacient.id)

    this.filteredPacients = ''
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


}
