import { Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn: boolean = false;
  constructor(private localStorage: LocalStorageService) { }

  isAuthenticated(): boolean {
    if (this.loggedIn || this.localStorage.getStorage()) {
      return true
    } else {
      return false
    }
  }

  logIn(user): void {
    this.loggedIn = true
    if (!this.localStorage.getStorage()) {
      this.localStorage.userLoggedIn(user)
    }
  }
}
