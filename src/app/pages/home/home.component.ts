import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  toggleLateralMenu
  pageName = 'Estatísticas e Informações'

  constructor( ) {  }

  openMenu(event) {
    this.toggleLateralMenu = event
  }

  changePageName(event: string) {
    this.pageName = event
  }
}
