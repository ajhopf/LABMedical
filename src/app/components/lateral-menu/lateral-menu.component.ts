import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent {
  @Output('onToggleMenu') onToggleMenu = new EventEmitter<any>()

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  onClick(){
    this.onToggleMenu.emit(true)
  }

  onLogOut(){
    this.localStorage.userLoggedOut()
    this.router.navigate(['/'])
  }
}
