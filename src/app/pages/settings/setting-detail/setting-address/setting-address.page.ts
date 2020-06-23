import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.page.html',
  styleUrls: ['./setting-address.page.scss'],
})
export class SettingAddressPage implements OnInit {
  refreshPage = 0
  constructor(public router : Router, public route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.refreshPage = parseInt(this.router.getCurrentNavigation().extras.state.refreshPage);
      }
      if(this.refreshPage == 1){
        console.log("Refresh Page")
      }
    });
  }

  ionViewDidLeave(){
    this.refreshPage = 0;
  }

  addMyAddress(){
    this.router.navigate(["settings/setting-detail/setting-address/add-address"])
  }

}
