import { Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = false;
  constructor(
    private localStorage: LocalStorageService
  ) { }

  isAuthenticated() {
    // const promise = new Promise (
    //   resolve => {
    //     resolve(this.loggedIn)
    //   }
    // )
    // return promise
    if (this.loggedIn || this.localStorage.getStorage()) {
      return true
    } else {
      return false
    }
  }

  logIn(user) {
    this.loggedIn = true
    if (!this.localStorage.getStorage()) {
      this.localStorage.userLoggedIn(user)
    }
  }

  logOut() {
    this.loggedIn = false
  }
}
