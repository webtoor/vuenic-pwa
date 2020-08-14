import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.page.html',
  styleUrls: ['./setting-detail.page.scss'],
})
export class SettingDetailPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }


  settingMyProfile(){
    this.router.navigate(["settings/setting-detail/setting-user-info"])
  }

  settingMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address"])
  }

  settingPassword(){
    this.router.navigate(["settings/setting-detail/setting-password"])
  }

}
