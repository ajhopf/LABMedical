import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  private auth: Auth = inject(Auth);
  @ViewChild('newUser') newUserForm: NgForm | undefined

  userAvatarNumber: number = 1
  userCreated: boolean = false;

  constructor() {}

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

    createUserWithEmailAndPassword(this.auth, createdUser.email, createdUser.password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: createdUser.name,
          photoURL: createdUser.avatar
        });

        console.log(user);
      })
      .catch((error) => {
        alert("Não foi possível criar um novo usuário\n" + error)
      })
  }
}
