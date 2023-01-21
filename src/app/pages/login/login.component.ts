import { Component, DoCheck, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DoctorsDBService } from "../../services/doctors-db.service";
import { URLS } from "../../constants/urls";
import { NgForm } from "@angular/forms";
import { filter } from "rxjs";

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
    private doctorsDB: DoctorsDBService
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
            console.log(users[user])
            this.loginAllowed = true
            console.log(this.loginAllowed)
          } else {
            console.log(false)
          }
        }
      })
  }

  fetchUsers() {
    return this.doctorsDB.getUsers()
  }
}
