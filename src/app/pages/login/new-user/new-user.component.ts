import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DoctorsDBService } from "../../../services/doctors-db.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  @ViewChild('newUser') newUserForm: NgForm | undefined
  userAvatarNumber = 1

  constructor(private doctorDB: DoctorsDBService) {}

  changeAvatar(){
    this.userAvatarNumber++
  }

  onCreateUser(){
    this.doctorDB.createUser({
      name: this.newUserForm!.value.username,
      email: this.newUserForm!.value.email,
      password: this.newUserForm!.value.newPassword,
      avatar: 'https://robohash.org/' + this.newUserForm!.value.email+this.userAvatarNumber
    })
  }
}
