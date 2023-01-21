import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = false;
  constructor() { }

  isAuthenticated() {
    // const promise = new Promise (
    //   resolve => {
    //     resolve(this.loggedIn)
    //   }
    // )
    // return promise
    return this.loggedIn
  }

  logIn() {
    this.loggedIn = true
  }

  logOut() {
    this.loggedIn = false
  }
}
