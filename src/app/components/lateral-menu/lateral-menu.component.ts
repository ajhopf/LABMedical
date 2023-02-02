import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Router } from "@angular/router";
import { AuthGuardGuard } from "../../shared/guards/auth-guard.guard";

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit{
  @Output('onToggleMenu') onToggleMenu = new EventEmitter<any>()
  @Output('onPageChange') pageChange = new EventEmitter<string>()

  isDarkMode: boolean

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let currentMode = JSON.parse(localStorage.getItem('dark-mode'))

    if (currentMode) {
      this.isDarkMode = currentMode['darkMode']
    }
  }

  onLogOut(): void {
    this.router.navigate(['/'])
  }

  updateHeader(page: string): void {
    this.pageChange.emit(page)
  }

  onDarkModeClick(darkMode: boolean): void {
    this.isDarkMode = darkMode
  }
}
