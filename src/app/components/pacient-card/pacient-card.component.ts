import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pacient-card',
  templateUrl: './pacient-card.component.html',
  styleUrls: ['./pacient-card.component.css']
})
export class PacientCardComponent {
  @Input() pacient

  constructor(private router: Router) {
  }


  onCardClick(pacientId: number){
    console.log(pacientId)
    this.router.navigate([`./home/pacient-registration/${pacientId}`])
  }
}
