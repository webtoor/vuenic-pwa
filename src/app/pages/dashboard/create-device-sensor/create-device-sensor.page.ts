import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-device-sensor',
  templateUrl: './create-device-sensor.page.html',
  styleUrls: ['./create-device-sensor.page.scss'],
})
export class CreateDeviceSensorPage implements OnInit {
  createDeviceSensor: FormGroup;
  devices;
  sensors;
  constructor(public router : Router, public loading: LoaderService, private formBuilder: FormBuilder, public httpService: AuthService) {
    this.createDeviceSensor = this.formBuilder.group({
      'device_id' : [null, [Validators.required]],
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
    this.getDevice()
    this.getSensor()
  }

  getDevice(){
    this.httpService.GetRequest('device').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.devices = res.data
      }
    });
  }

  getSensor(){
    this.httpService.GetRequest('sensor').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.sensors = res.data
      }
    });
  }

}
