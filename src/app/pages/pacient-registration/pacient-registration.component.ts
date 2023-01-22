import { Component, OnInit, ViewChild } from '@angular/core';
import { ViacepService } from "../../services/viacep.service";
import { PacientsDbService } from "../../services/pacients-db.service";

@Component({
  selector: 'app-pacient-registration',
  templateUrl: './pacient-registration.component.html',
  styleUrls: ['./pacient-registration.component.css']
})
export class PacientRegistrationComponent implements OnInit{
  @ViewChild('newPacient') newPacientForm

  pacient = {
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
    private pacientsDB: PacientsDbService
  ) {

  }


  onCreatePacient(){
    console.log(this.pacient)

    this.pacientsDB.createPacient(this.pacient)
  }

  ngOnInit() {
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






















