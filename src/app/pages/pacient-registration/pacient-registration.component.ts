import { Component, OnInit, ViewChild } from '@angular/core';

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
      phoneNumber: ''
    }
  }

  onCreatePacient(){
    console.log(this.newPacientForm.value)
    console.log(this.pacient)
  }

  ngOnInit() {
  }

  formatCpf() {
    let pacientCpf = this.pacient.identification.cpf

    if ( pacientCpf.length === 11 && pacientCpf.match(/^\d{11}$/)) {
      const formattedPacientCpf = pacientCpf.substring(0,3) + '.' + pacientCpf.substring(3,6) + '.' + pacientCpf.substring(6, 9) + '-' + pacientCpf.substring(9)
      this.pacient.identification.cpf = formattedPacientCpf
    }
  }

}






















