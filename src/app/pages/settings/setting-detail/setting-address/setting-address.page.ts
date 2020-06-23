import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.page.html',
  styleUrls: ['./setting-address.page.scss'],
})
export class SettingAddressPage implements OnInit {
  refreshPage = 0
  userAddress;
  constructor(public router : Router, public route : ActivatedRoute, public httpService: AuthService) { }

  ngOnInit() {
    this.getUserAddress()
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.refreshPage = parseInt(this.router.getCurrentNavigation().extras.state.refreshPage);
      }
      if(this.refreshPage == 1){
        console.log("Refresh Page")
        this.getUserAddress()
      }
    });
  }

  ionViewDidLeave(){
    this.refreshPage = 0;
  }

  getUserAddress(){
    this.httpService.GetRequest('user-address').subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.userAddress = res.data
        }
      });
  }

  addMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address/add-address"])
  }

}
