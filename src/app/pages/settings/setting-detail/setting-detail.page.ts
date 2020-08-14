import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.page.html',
  styleUrls: ['./setting-detail.page.scss'],
})
export class SettingDetailPage implements OnInit {
  password = null;
  constructor(public router : Router, public httpService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserInfo();
  }


  settingMyProfile(){
    this.router.navigate(["settings/setting-detail/setting-user-info"])
  }

  settingMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address"])
  }

  settingPassword(){
    let navigationExtras: NavigationExtras = {
      state : {
       statusPWD : this.password
      }
    };
    this.router.navigate(["settings/setting-detail/setting-password"], navigationExtras)
  }

  getUserInfo(){
    this.httpService.GetRequest('user-info').subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        if (res.data.password) {
          this.password = "update-password"
        }else{
          this.password = "set-password"
        }
      }
    });
  }

}
