import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injectable, Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorsDBService } from "../../services/doctors-db.service";
import { PageHeaders } from "../../constants/page-headers";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
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

    //Garantindo o nome do header mesmo que digite diretamente a rota
    this.pageHeader = this.possibleHeaders[this.router.url.substring(6)]
  }

  onLogOut(){
    this.localStorage.userLoggedOut()
    this.router.navigate(['/'])
  }

  onEditProfile() {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }

  onSliderClick(){
    this.onToggleMenu.emit(this.isMenuOpen)
  }
}
