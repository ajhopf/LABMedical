import { Component, OnInit } from '@angular/core';
import { DoctorsDBService } from "../../services/doctors-db.service";
import { URLS } from "../../constants/urls";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  doctors: {email: string, password: string} | {} = {}

  urls = URLS
  password: string = '';
  email: string = '';
  constructor(
    private doctorsDB: DoctorsDBService
  ) {}

  ngOnInit() {
    console.log(this.urls)
  }
}
