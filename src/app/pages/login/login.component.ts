import { Component, DoCheck, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DoctorsDBService } from "../../shared/services/doctors-db.service";
import { URLS } from "../../shared/constants/urls";
import { NgForm } from "@angular/forms";
import { filter, Observable } from "rxjs";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined

  loginAllowed:boolean = false

  urls = URLS

  triedLogin: boolean = false

  constructor(
    private doctorsDB: DoctorsDBService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogin(): void {
    let userEmail = this.loginForm.value.email
    let userPassword = this.loginForm.value.password

    this.fetchUsers()
      .subscribe(users => {
        let loggedUser

        for (let user in users) {
          if (users[user].email === userEmail && users[user].password === userPassword) {
            this.loginAllowed = true
            loggedUser = users[user]
          }
        }

        if (this.loginAllowed) {
          this.authenticationService.logIn(loggedUser)
          this.router.navigate(['/home'])
        } else {
          this.triedLogin = true
          alert('Usuário não cadastrado ou credenciais inválidas!')
        }
      })
  }

  fetchUsers(): Observable<any> {
    return this.doctorsDB.getUsers()
  }

  onForgotPasswordClick(): void {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }
}
