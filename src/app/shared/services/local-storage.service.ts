import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor( ) { }

  userLoggedIn(user) {
    localStorage.setItem('userId', user.id)
  }

  userLoggedOut(){
    localStorage.removeItem('userId')
  }

  getStorage() {
    return localStorage.getItem('userId')
  }
}
