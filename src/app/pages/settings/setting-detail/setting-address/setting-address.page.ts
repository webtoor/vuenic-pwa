import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.page.html',
  styleUrls: ['./setting-address.page.scss'],
})
export class SettingAddressPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }

  addMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address/add-address"])
  }

}
