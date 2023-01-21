import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorsDBService } from "../../services/doctors-db.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  pageHeader = ''
  currentUserId = 0
  currentUser = {}
  userAvatar = ''

  constructor(
    private localStorage: LocalStorageService,
    private doctorsDB: DoctorsDBService,
    private router: Router,
    private route: ActivatedRoute

  ) {}



  ngOnInit() {
    this.currentUserId = +this.localStorage.getStorage()

    this.doctorsDB.getUser(this.currentUserId)
      .subscribe((user) => {
        this.currentUser = user
        this.userAvatar = user['avatar']
        console.log(this.currentUser)
      })

    let currentPage = this.router.url.substring(6)

    this.route.data.subscribe(value => {
      this.pageHeader = value[currentPage]
    })
  }

  onLogOut(){
    this.localStorage.userLoggedOut()
    this.router.navigate(['/'])
  }

  onEditProfile() {
    alert('Desculpe, ainda estamos trabalhando para implementar essa função!')
  }
}
