import { Component, DoCheck, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DoctorsDBService } from "../../services/doctors-db.service";
import { URLS } from "../../constants/urls";
import { NgForm } from "@angular/forms";
import { filter } from "rxjs";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm: NgForm | undefined

  loginAllowed = false

  urls = URLS

  constructor(
    private doctorsDB: DoctorsDBService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onLogin(){
    let userEmail = this.loginForm.value.email
    let userPassword = this.loginForm.value.password

    this.fetchUsers()
      .subscribe(users => {
        for (let user in users) {
          if (users[user].email === userEmail && users[user].password === userPassword) {
            this.loginAllowed = true
          }
        }

        if (this.loginAllowed) {
          this.authenticationService.logIn()
          this.router.navigate(['/home'])
        } else {
          alert('Usuário não cadastrado ou credenciais inválidas!')
        }
      })
  }

  fetchUsers() {
    return this.doctorsDB.getUsers()
  }
}
