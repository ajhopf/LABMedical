import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { DarkModeService } from "angular-dark-mode";

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent implements OnInit{
  @Output('darkMode') darkModeEmit = new EventEmitter<boolean>()
  darkMode = false
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    let isDarkModeOn = JSON.parse(localStorage.getItem('dark-mode'))
    this.darkMode = isDarkModeOn['darkMode']
  }

  onToggleDarkMode(): void {
    this.darkModeService.toggle()
    this.darkModeEmit.emit(this.darkMode)
  }
}
