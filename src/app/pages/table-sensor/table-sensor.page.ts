import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-table-sensor',
  templateUrl: './table-sensor.page.html',
  styleUrls: ['./table-sensor.page.scss'],
})
export class TableSensorPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }

  backButton(){
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        backButton: 1,
      }
    };
    this.router.navigate(['/tabs/dashboard'], navigationExtras);
  }

}
