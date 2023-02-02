import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  toggleLateralMenu: boolean
  pageName: string = 'Estatísticas e Informações'

  constructor( ) {  }

  openMenu(toggleMenu: boolean): void {
    this.toggleLateralMenu = toggleMenu
  }

  changePageName(event: string): void {
    this.pageName = event
  }
}
