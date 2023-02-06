import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { ConfirmationService } from "primeng/api";

import { ViacepService } from "../../shared/services/viacep.service";
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { Pacient } from "../../shared/models/pacient.model";
import { AppointmentsDbService } from "../../shared/services/appointments-db.service";
import { ExamsDbService } from "../../shared/services/exams-db.service";
import { Appointment } from "../../shared/models/appointment.model";
import { Exam } from "../../shared/models/exam.model";

@Component({
  selector: 'app-pacient-registration',
  templateUrl: './pacient-registration.component.html',
  styleUrls: ['./pacient-registration.component.css']
})
export class PacientRegistrationComponent implements OnInit{
  @ViewChild('newPacient') newPacientForm
  isSaving: boolean = false
  userId: string = ''
  hasRecords: boolean = false

  pacient: Pacient = {
    identification: {
      pacientName: '',
      pacientGender: 'feminino',
      dob: new Date().toISOString().slice(0,10),
      cpf: '',
      rg: {
        number: '',
        dispatcher: ''
      },
      civilState: 'solteiro',
      phoneNumber: '',
      email: '',
      cityOfBirth: '',
      emergencyContact: '',
      alergies:'',
      specialCare: ''
    },
    healthInsurance: {
      insurance: '',
      insuranceNumber: '',
      insuranceValidity: ''
    },
    address: {
      cep: '',
      city: '',
      state: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      reference: ''
    }
  }

  constructor(
    private viacep: ViacepService,
    private pacientsDB: PacientsDbService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private appointmentsDB: AppointmentsDbService,
    private examsDB: ExamsDbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']

    if (this.userId) {
      this.pacientsDB.getPacient(this.userId).subscribe((pacient: Pacient) => {
        this.pacient = pacient
      })

      this.appointmentsDB.getAppointmentsByUserId(this.userId).subscribe(
        (appointments: Appointment[]) => {
          if (appointments.length > 0) {
            this.hasRecords = true
          }
        }
      )

      this.examsDB.getExamsByPacientId(this.userId).subscribe(
        (exams: Exam[] ) => {
          if (exams.length > 0) {
            this.hasRecords = true
          }
        }
      )
    }
  }

  formatCpf(): void {
    let pacientCpf = this.pacient.identification.cpf

    if ( pacientCpf.length === 11 && pacientCpf.match(/^\d{11}$/)) {
      this.pacient.identification.cpf = pacientCpf.substring(0,3) + '.' + pacientCpf.substring(3,6) + '.' + pacientCpf.substring(6, 9) + '-' + pacientCpf.substring(9)
    }
  }

  getAdress(): void {
    let formatedCep = this.pacient.address.cep.replace('-', '')

    this.viacep.getAddress(+formatedCep)
      .subscribe(
        address => {
        this.pacient.address.city = address['localidade']
        this.pacient.address.state = address['uf']
        this.pacient.address.street = address['logradouro']
        this.pacient.address.district = address['bairro']
      },
        error => {
          console.error(error.message)
          alert('CEP inválido!')
      })
  }

  generateConfirmationMessage(): string {
    return `<pre>
    <strong>Nome:</strong> ${this.pacient.identification.pacientName}
    <strong>Gênero: </strong>${this.pacient.identification.pacientGender}
    <strong>Data de Nascimento:</strong>${new Date(this.pacient.identification.dob).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
    <strong>CPF: </strong>${this.pacient.identification.cpf}
    <strong>Rg: </strong>${this.pacient.identification.rg.number} / ${this.pacient.identification.rg.dispatcher}
    <strong>Estado Civil: </strong>${this.pacient.identification.civilState}
    <strong>Naturalidade: </strong>${this.pacient.identification.cityOfBirth}\n
    <strong>Telefone: </strong>${this.pacient.identification.phoneNumber}
    <strong>Email: </strong>${this.pacient.identification.email}
    <strong>Contato de Emergência: </strong>${this.pacient.identification.emergencyContact}\n
    <strong>Alergias: </strong>${this.pacient.identification.alergies ? this.pacient.identification.alergies : 'Sem alergias'}\n
    <strong>Cuidados Especiais: </strong>${this.pacient.identification.specialCare ? this.pacient.identification.specialCare : 'Não' +
      ' necessita cuidados especiais'}\n
    <strong>Convênio: </strong>${this.pacient.healthInsurance.insurance ?
      (this.pacient.healthInsurance.insurance + ' / Número: ' + this.pacient.healthInsurance.insuranceNumber +
        ' / Validade: ' + new Date(this.pacient.healthInsurance.insuranceValidity).toLocaleDateString('pt-BR', {timeZone: 'UTC'})) : 'Sem convênio'}\n
    <strong>Endereço: </strong>${this.pacient.address.street}, ${this.pacient.address.number} ${this.pacient.address.complement} / ${this.pacient.address.district}, ${this.pacient.address.state}, ${this.pacient.address.city}\n
    </pre>`
  }

  onCreatePacient(): void {
    this.confirmationService.confirm({
      message: this.generateConfirmationMessage(),
      header: 'Confirme as informações do paciente',
      accept: () => {

        //Verifying if there isn't already a pacient with same name
        this.pacientsDB.getPacientByName(this.pacient).subscribe(
          (pacients: Pacient[]) => {
            //saving if new pacient
            if (pacients.length === 0) {
              this.isSaving = true
              setTimeout(() => {
                this.pacientsDB.createPacient(this.pacient).subscribe(
                  (createdPacient: Pacient) => {
                    alert(`Cadastro para o(a) paciente ${createdPacient.identification.pacientName} criado com sucesso`)
                    this.isSaving = false
                    this.newPacientForm.reset()
                  },
                  error => {
                    alert('Paciente não foi criado!' + `${error.message}`)
                    this.isSaving = false
                  }
                )
              },1500)
            } else {
              alert(`Paciente ${this.pacient.identification.pacientName} já cadastrado!`)
            }
          }
        )

      }
    })
  }

  onEditRegistration(): void {
    this.confirmationService.confirm({
      message: this.generateConfirmationMessage() + 'Confirmar edição?',
      header: 'Confirme as informações para editar o Cadastro de Paciente',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.pacientsDB.editPacient(this.pacient).subscribe(
            () => {
              alert(`Cadastro para o(a) paciente ${this.pacient.identification.pacientName} atualizado com sucesso`)
              this.isSaving = false
            },
            error => {
              alert('Paciente não foi atualizado! ' + `${error.message}`)
              this.isSaving = false
            }
          )
        },1500)
      }
    })
  }

  onDeleteRegistration(): void {
    this.confirmationService.confirm({
      message: `<pre>
        Você está prestes a deletar o registro de ${this.pacient.identification.pacientName}\n
        Confirmar deleção?
        </pre>`,
      header: 'Deletar paciente',
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.pacientsDB.deletePacient(this.userId).subscribe(
            () => {
              this.isSaving = false
              this.router.navigate(['/home/pacient-registration'])
            }, error => {
              console.error('Paciente não foi deletado!', error.message)
            }
          )
        },1500)
      }
    })
  }
}






















