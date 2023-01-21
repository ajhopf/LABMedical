import { Component } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  onLogOut(){
    this.localStorage.userLoggedOut()
    this.router.navigate(['/'])
  }
}
