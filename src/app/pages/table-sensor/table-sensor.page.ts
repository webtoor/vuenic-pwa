import { Component } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-table-sensor',
  templateUrl: './table-sensor.page.html',
  styleUrls: ['./table-sensor.page.scss'],
})
export class TableSensorPage {
  projectDeviceID;
  sensorID;
  arraySensor;
  constructor(public router : Router, public route : ActivatedRoute, public httpService: AuthService,) { 
    this.projectDeviceID = this.route.snapshot.paramMap.get('projectDeviceID');
    this.sensorID = this.route.snapshot.paramMap.get('sensorID');
  }

  ionViewWillEnter(){
    console.log(this.projectDeviceID, this.sensorID)
    this.getSensorData()
  }

  getSensorData(){
    this.httpService.GetRequest('sensor/' + this.projectDeviceID + "/" + this.sensorID).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.arraySensor = res.data.data_sensor
      }
    });
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
