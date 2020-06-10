import { Component, OnInit, NgZone} from '@angular/core';
import { UserProjectService } from '../../services/user-project.service';
import { MenuController } from '@ionic/angular';
import { DeviceSensorService } from '../../services/device-sensor.service';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  subscription: Subscription
  projectName : String;
  commodityName : String;
  commodityTypeName : String;
  project: String;
  projectType : String;
  projectDevice : Number;
  projectLocation;
  deviceSegment;
  segmentDefault;
  deviceSensor; 
  public alive = true;
  constructor(public router: Router, public menu: MenuController, public httpService : UserProjectService, public httpDeviceSensor : DeviceSensorService, private _ngZone: NgZone) {
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
    if(this.projectName && this.projectDevice){
      this.setInterval()
    }
  }

  getUserProject(){
    this.httpService.getUserProject('user-project').subscribe(res => {
      console.log(res);
      if((res.status == 200) && (Object.keys(res.data).length > 0)){
        this.projectName = res.data.project_name;
        this.project = res.data.project.name;
        this.projectType = res.data.project_type.name;
        this.commodityName = res.data.commodity.name;
        this.commodityTypeName = res.data.commodity_type.name;
        this.projectLocation = res.data.project_location;
        if(res.data.project_device){
          this.projectDevice = res.data.project_device.length;
          this.deviceSegment = res.data.project_device;
          this.segmentDefault = res.data.project_device[0]["id"]
          this.getSensorData(this.segmentDefault);
        }
      }
    });
  }

  segmentChanged(value){
    //console.log('segmentChanged')
    this.segmentDefault = value
    this.getSensorData(this.segmentDefault);
    this.setInterval();
  }

  setInterval(){
    const intervallTimer = interval(60000 * 10);
    this.subscription = intervallTimer.pipe(takeWhile(() => this.alive)).subscribe(val => this.getSensorData(this.segmentDefault));
  }

  getSensorData(device_id){
    this.httpDeviceSensor.getDeviceSensor('device-sensor/'+ device_id).subscribe(res => {
     console.log(res.data);
      if(res.status == 200){
        this.deviceSensor = res.data
        if(this.deviceSensor.length == 0 || this.deviceSensor[0]["data_sensor"] == null){
          //console.log('sensor-false')
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

  createProject(){
    this.router.navigate(["tabs/dashboard/create-project"])
  }

  createDeviceSensor(){
    this.router.navigate(["tabs/dashboard/create-device-sensor"])
  }

}
