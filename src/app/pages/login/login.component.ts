import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { DoctorsDBService } from "../../shared/services/doctors-db.service";
import { URLS } from "../../shared/constants/urls";
import { AuthenticationService } from "../../shared/services/authentication.service";

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  @ViewChild('loginForm') loginForm: NgForm | undefined

  loginAllowed:boolean = false

  urls = URLS

  triedLogin: boolean = false

  constructor(
    private doctorsDB: DoctorsDBService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // onLogin(): void {
  //   let userEmail = this.loginForm.value.email
  //   let userPassword = this.loginForm.value.password

  //   this.fetchUsers()
  //     .subscribe(users => {
  //       let loggedUser

  //       for (let user in users) {
  //         if (users[user].email === userEmail && users[user].password === userPassword) {
  //           this.loginAllowed = true
  //           loggedUser = users[user]
  //         }
  //       }

  //       if (this.loginAllowed) {
  //         this.authenticationService.logIn(loggedUser)
  //         this.router.navigate(['/home'])
  //       } else {
  //         this.triedLogin = true
  //         alert('Usuário não cadastrado ou credenciais inválidas!')
  //       }
  //     })
  // }

  async onLogin(): Promise<any> {
    let { email, password} = this.loginForm.value;

    console.log(email, password);

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      this.router.navigate(['home'])

      console.log(userCredential);

    } catch (err) {
      console.log(err)
      alert("credenciais inválidas!")
    }
  }

  fetchUsers(): Observable<any> {
    return this.doctorsDB.getUsers()
  }

  onForgotPasswordClick(): void {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }
}
