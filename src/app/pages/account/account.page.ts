import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  fullName : String
  constructor(public router : Router) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('vuenic-pwa'));
    this.fullName = token["fullname"]
  }

  myProfile(){
    this.router.navigate(["settings"])
  }
}
