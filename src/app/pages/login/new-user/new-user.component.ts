import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DoctorsDBService } from "../../../shared/services/doctors-db.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  @ViewChild('newUser') newUserForm: NgForm | undefined

  userAvatarNumber: number = 1
  userCreated: boolean = false;

  constructor(private doctorsDB: DoctorsDBService) {}

  changeAvatar(){
    this.userAvatarNumber++
  }

  onCreateUser(): void{
    let createdUser = {
      name: this.newUserForm.value.username,
      email: this.newUserForm.value.email,
      password: this.newUserForm.value.newPassword,
      avatar: 'https://robohash.org/' + this.newUserForm.value.email+this.userAvatarNumber
    }

    this.doctorsDB.getUsers()
      .subscribe(users => {
        let alreadyUsedEmail = false

        for (let user in users) {
          if (users[user].email === createdUser.email) {
            alreadyUsedEmail = true
          }
        }

        if (alreadyUsedEmail) {
          alert('Email já cadastrado!')
        } else {
          this.doctorsDB.createUser(createdUser)
          this.newUserForm.reset()
          this.userCreated = true;
        }
      }
    )
  }
}
