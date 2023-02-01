import {
  AfterViewInit,
  Component, DoCheck,
  EventEmitter,
  Injectable, Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorsDBService } from "../../shared/services/doctors-db.service";
import { PageHeaders } from "../../shared/constants/page-headers";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit, DoCheck {
  @Output('onToggleMenu') onToggleMenu = new EventEmitter<boolean>()
  @Input() pageHeader: string = ''

  isMenuOpen = false
  currentUserId = 0
  currentUser = {}
  userAvatar = ''
  possibleHeaders = PageHeaders

  constructor(
    private localStorage: LocalStorageService,
    private doctorsDB: DoctorsDBService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserId = +this.localStorage.getStorage()

    this.doctorsDB.getUser(this.currentUserId)
      .subscribe((user) => {
        this.currentUser = user
        this.userAvatar = user['avatar']
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
    this.router.navigate(['/'])
  }

  onEditProfile() {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }

  onSliderClick(){
    this.isMenuOpen = !this.isMenuOpen
    this.onToggleMenu.emit(this.isMenuOpen)
  }
}
