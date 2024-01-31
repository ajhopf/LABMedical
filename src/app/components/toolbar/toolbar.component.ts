import {
  Component, DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router } from "@angular/router";

import { LocalStorageService } from "../../shared/services/local-storage.service";
import { DoctorsDBService } from "../../shared/services/doctors-db.service";
import { PageHeaders } from "../../shared/constants/page-headers";
import { Doctor } from "../../shared/models/doctor.model";
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit, DoCheck {
  private auth: Auth = inject(Auth);

  @Output('onToggleMenu') onToggleMenu = new EventEmitter<boolean>()
  @Input() pageHeader: string = ''

  isMenuOpen: boolean = false

  currentUser: Doctor = {
    name: '',
    email: '',
  }
  userAvatar: string = ''
  possibleHeaders = PageHeaders

  constructor(private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if(user) {
        this.userAvatar = user.photoURL;
        this.currentUser = {
          name: user.displayName,
          email: user.email
        }
      }
    })
  }

  ngDoCheck() {
    //checando o título da página conforme a rota
    this.pageHeader = this.possibleHeaders[this.router.url.substring(6)]
    //checando o título da página se a rota tiver /home/algumacoisa/restante
    if(typeof this.pageHeader === 'undefined'){
      this.pageHeader = this.possibleHeaders[this.router.url.substring(6, this.router.url.lastIndexOf('/'))]
    }
  }

  onLogOut(){
    signOut(this.auth)
    .then(() => {
      console.log('sign out successful')
      this.router.navigate([""]);
    })
    .catch((error) => {
      console.log('could not sign out')
    })
  }

  onEditProfile() {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }

  onSliderClick(){
    this.isMenuOpen = !this.isMenuOpen
    this.onToggleMenu.emit(this.isMenuOpen)
  }
}
