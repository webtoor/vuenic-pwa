import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conf-device-sensor',
  templateUrl: './conf-device-sensor.page.html',
  styleUrls: ['./conf-device-sensor.page.scss'],
})
export class ConfDeviceSensorPage implements OnInit {
  project_device_id
  constructor(public router: Router,public httpService: AuthService, public route : ActivatedRoute,) { 
    this.project_device_id = this.route.snapshot.paramMap.get('project_device_id');
  }

  ngOnInit() {
  }

  editDeviceSensor(){
    this.router.navigate(["tabs/dashboard/conf-device-sensor/" + this.project_device_id + "/edit-device-sensor/" + this.project_device_id])
  }

}
