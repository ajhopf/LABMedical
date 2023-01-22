import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pacient-registration',
  templateUrl: './pacient-registration.component.html',
  styleUrls: ['./pacient-registration.component.css']
})
export class PacientRegistrationComponent implements OnInit{
  @ViewChild('newPacient') newPacientForm
  @ViewChild('dob') dobInput

  pacient = {
    identification: {
      pacientName: 'André',
      pacientGender: 'masculino',
      dob: new Date().toISOString().slice(0,10)
    }
  }

  onCreatePacient(){
    console.log(this.newPacientForm.value)
  }

  ngOnInit() {
    console.log(this.pacient.identification.dob)
  }

}






















