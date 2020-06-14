import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conf-device-sensor',
  templateUrl: './conf-device-sensor.page.html',
  styleUrls: ['./conf-device-sensor.page.scss'],
})
export class ConfDeviceSensorPage implements OnInit {
  project_device_id
  constructor(public httpService: AuthService, public route : ActivatedRoute,) { 
    this.project_device_id = this.route.snapshot.paramMap.get('project_device_id');
  }

  ngOnInit() {
    this.getProjectDevice()
  }

  getProjectDevice(){
    this.httpService.GetRequest('project_device/' + this.project_device_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
      }
    });
  }

}
