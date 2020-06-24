import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.page.html',
  styleUrls: ['./setting-account.page.scss'],
})
export class SettingAccountPage implements OnInit {
  infoUser
  constructor(public httpService: AuthService,) { }

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

}
