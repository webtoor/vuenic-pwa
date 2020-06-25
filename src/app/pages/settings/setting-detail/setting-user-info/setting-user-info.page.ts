import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-setting-user-info',
  templateUrl: './setting-user-info.page.html',
  styleUrls: ['./setting-user-info.page.scss'],
})
export class SettingUserInfoPage implements OnInit {
  infoUser
  constructor(public router : Router, public loading: LoaderService, public httpService: AuthService) {
  }
  ngOnInit() {
    this.getInfoAccount()
  }

  getInfoAccount(){

    this.httpService.GetRequest('user-info').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.infoUser = res.data
      }
    });
  }

  editUserInfo(type){
    let navigationExtras: NavigationExtras = {
      state: {
        userInfoType : type
      }
    };
    this.router.navigate(['/settings/setting-detail/setting-user-info/edit-user-info'], navigationExtras);
  }

}
