import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-device-sensor',
  templateUrl: './edit-device-sensor.page.html',
  styleUrls: ['./edit-device-sensor.page.scss'],
})
export class EditDeviceSensorPage implements OnInit {
project_device_id;
  constructor(public router: Router,public httpService: AuthService, public route : ActivatedRoute) { 
    this.project_device_id = this.route.snapshot.paramMap.get('project_device_id');
  }
  ngOnInit() {
    this.getProjectDevice();
  }

  getProjectDevice(){
    this.httpService.GetRequest('project-device/' + this.project_device_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
      }
    });
  }

}
