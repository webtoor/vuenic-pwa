import { Component, OnInit, NgZone} from '@angular/core';
import { UserProjectService } from '../../services/user-project.service';
import { MenuController } from '@ionic/angular';
import { DeviceSensorService } from '../../services/device-sensor.service';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  subscription: Subscription
  projectName : String;
  commodityName : String;
  projectType : String;
  projectDevice : Number;
  projectLocation;
  deviceSegment;
  segmentDefault;
  deviceSensor; 
  public alive = true;
  constructor(public menu: MenuController, public httpService : UserProjectService, public httpDeviceSensor : DeviceSensorService, private _ngZone: NgZone) {
    this.menu.enable(true);
   }

  ngOnInit() {
    this.getUserProject();
  }

  ionViewDidLeave(){
    this.alive = false;
  }

  ionViewDidEnter(){
    this.alive = true;
    this.setInterval()
  }

  getUserProject(){
    this.httpService.getUserProject('user-project').subscribe(res => {
      console.log(res);
      if(res.status == "1"){
        this.projectName = res.data.project_name;
        this.projectType = res.data.project.name;
        this.commodityName = res.data.commodity.name;
        this.projectDevice = res.data.project_device.length;
        this.deviceSegment = res.data.project_device;
        this.projectLocation = res.data.project_location;
        this.segmentDefault = res.data.project_device[0]["id"]
      }
    });
  }

  segmentChanged(value){
    this.segmentDefault = value
    this.getSensorData(this.segmentDefault);
    this.setInterval();
  }

  setInterval(){
    const intervallTimer = interval(60000 * 1);
    this.subscription = intervallTimer.pipe(takeWhile(() => this.alive)).subscribe(val => this.getSensorData(this.segmentDefault));
  }

  getSensorData(device_id){
    this.httpDeviceSensor.getDeviceSensor('device-sensor/'+ device_id).subscribe(res => {
     console.log(res.data);
      if(res.status == "1"){
        this.deviceSensor = res.data
        if(this.deviceSensor.length == 0 || this.deviceSensor.data_sensor == null){
          this.alive = false;
        }else{
          this.alive = true;
        }
       /*  this._ngZone.run(() => {      
         
       }); */
      }else{
        this.alive = false;
      }
    });
  }

}
