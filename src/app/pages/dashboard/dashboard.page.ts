import { Component, OnInit, NgZone} from '@angular/core';
import { UserProjectService } from '../../services/user-project.service';
import { DeviceSensorService } from '../../services/device-sensor.service';
import { interval, Subscription } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  subscription: Subscription
  projectName : String;
  projectType : String;
  projectDevice : Number;
  deviceSegment;
  segmentDefault;
  deviceSensor; 
  public intervallTimer = interval(1000);
  private alive = true;
  constructor(public httpService : UserProjectService, public httpDeviceSensor : DeviceSensorService, private _ngZone: NgZone) {
   }

  ngOnInit() {
    console.log('ngOnInit')
    this.getUserProject();
  }

  ionViewDidLeave(){
    this.alive = false;
  }

  ionViewDidEnter(){
    this.alive = true;
    console.log('ionViewWillEnter')
    this.setInterval()
  }

  getUserProject(){
    this.httpService.getUserProject('user-project').subscribe(res => {
      //console.log(res);
      if(res.status == "1"){
        this.projectName = res.data.project_name;
        this.projectType = res.data.project.name;
        this.projectDevice = res.data.project_device.length;
        this.deviceSegment = res.data.project_device;
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
    this.subscription = this.intervallTimer.pipe(takeWhile(() => this.alive)).subscribe(val => this.getSensorData(this.segmentDefault));
  }

  getSensorData(device_id){
    this.httpDeviceSensor.getDeviceSensor('device-sensor/'+ device_id).subscribe(res => {
     console.log(res.data);
      if(res.status == "1"){
        this._ngZone.run(() => {      
          this.deviceSensor = res.data
          if(this.deviceSensor.length == 0){
            this.alive = false;
          }else{
            this.alive = true;
          }
       });
      }
    });
  }

}
