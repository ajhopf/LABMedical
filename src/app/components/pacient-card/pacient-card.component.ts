import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { Pacient } from "../../shared/models/pacient.model";

@Component({
  selector: 'app-pacient-card',
  templateUrl: './pacient-card.component.html',
  styleUrls: ['./pacient-card.component.css']
})
export class PacientCardComponent {
  @Input() pacient: Pacient

  constructor(private router: Router) {
  }


  onCardClick(pacientId: number){
    console.log(pacientId)
    this.router.navigate([`./home/pacient-registration/${pacientId}`])
  }

  calculateAge(pacientDob: string){
    let today = new Date();
    let birthDate = new Date(pacientDob);
    let age = today.getFullYear() - birthDate.getFullYear();
    //reducing one year if month of birth is after today in current year
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
}
