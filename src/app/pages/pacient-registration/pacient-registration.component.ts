import { Component, OnInit, ViewChild } from '@angular/core';
import { ViacepService } from "../../services/viacep.service";
import { PacientsDbService } from "../../services/pacients-db.service";
import { ConfirmationService } from "primeng/api";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-pacient-registration',
  templateUrl: './pacient-registration.component.html',
  styleUrls: ['./pacient-registration.component.css']
})
export class PacientRegistrationComponent implements OnInit{
  @ViewChild('newPacient') newPacientForm

  isSaving = false

  userId = ''

  pacient: any = {
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']

    if (this.userId) {
      this.pacientsDB.getPacient(this.userId).subscribe(pacient => {
        let returnedPacient = pacient

        this.pacient = returnedPacient
      })
    }

    console.log(this.userId)

    this.route.params.subscribe((params: Params) => {
      console.log(params)
    })
  }


  onCreatePacient(){
    let confirmationMessage = `<pre>
    <strong>Nome:</strong> ${this.pacient.identification.pacientName}\n
    <strong>Gênero: </strong>${this.pacient.identification.pacientGender}\n
    <strong>Data de Nascimento:</strong>${this.pacient.identification.dob}\n
    <strong>CPF: </strong>${this.pacient.identification.cpf}\n
    <strong>Rg: </strong>${this.pacient.identification.rg.number} / ${this.pacient.identification.rg.dispatcher}\n
    <strong>Estado Civil: </strong>${this.pacient.identification.civilState}\n
    <strong>Naturalidade: </strong>${this.pacient.identification.cityOfBirth}\n
    <strong>Telefone: </strong>${this.pacient.identification.phoneNumber}\n
    <strong>Email: </strong>${this.pacient.identification.email}\n
    <strong>Contato de Emergência: </strong>${this.pacient.identification.emergencyContact}\n
    <strong>Alergias: </strong>${this.pacient.identification.alergies ? this.pacient.identification.alergies : 'Sem alergias'}\n
    <strong>Cuidados Especiais: </strong>${this.pacient.identification.specialCare ? this.pacient.identification.specialCare : 'Não' +
      ' necessita cuidados especiais'}\n
    <strong>Convênio: </strong>${this.pacient.healthInsurance.insurance ?
      (this.pacient.healthInsurance.insurance + 'Número: ' + this.pacient.healthInsurance.insuranceNumber + 'Validade: ' + this.pacient.healthInsurance.insuranceValidity) : 'Sem convênio'}\n
    <strong>Endereço: </strong>${this.pacient.address.street}, ${this.pacient.address.number} ${this.pacient.address.complement} / ${this.pacient.address.district}, ${this.pacient.address.state}, ${this.pacient.address.city}
    </pre>`

    this.confirmationService.confirm({
      message: confirmationMessage,
      accept: () => {
        this.isSaving = true

        setTimeout(() => {
          this.pacientsDB.createPacient(this.pacient).subscribe(
            createdPacient => {
              alert(`Paciente ${createdPacient} criado com sucesso`)
              this.isSaving = false
              this.newPacientForm.reset()
            },
            error => {
              alert('Paciente não foi criado!' + `${error.message}`)
              this.isSaving = false
            }
          )
        },1500)
      }
    })
  }



  formatCpf() {
    let pacientCpf = this.pacient.identification.cpf

    if ( pacientCpf.length === 11 && pacientCpf.match(/^\d{11}$/)) {
      this.pacient.identification.cpf = pacientCpf.substring(0,3) + '.' + pacientCpf.substring(3,6) + '.' + pacientCpf.substring(6, 9) + '-' + pacientCpf.substring(9)
    }
  }

  getAdress(){
    this.viacep.getAddress(+this.pacient.address.cep)
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
}






















