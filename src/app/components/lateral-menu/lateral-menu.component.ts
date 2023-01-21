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
  @Output('onPageChange') pageChange = new EventEmitter<string>()

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  onLogOut(){
    this.localStorage.userLoggedOut()
    this.router.navigate(['/'])
  }

  updateHeader(page: string) {
    this.pageChange.emit(
      page
    )
  }
}
