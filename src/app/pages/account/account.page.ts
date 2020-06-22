import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  fullName : String
  constructor() { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('vuenic-pwa'));
    this.fullName = token["fullname"]
  }
}
