import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.page.html',
  styleUrls: ['./add-sensor.page.scss'],
})
export class AddSensorPage implements OnInit {
  addSensorForm : FormGroup
  useSensor;
  sensors;
  constructor(public httpService: AuthService, public route : ActivatedRoute, public router : Router, private formBuilder: FormBuilder) {
    this.addSensorForm = this.formBuilder.group({
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.useSensor = Object.values(params).map(function(v){return +v})
        console.log(this.useSensor)
    });
    this.getSensor()
  }
  
  getSensor(){
    this.httpService.GetRequest('sensor').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.sensors = res.data.filter(item => !this.useSensor.includes(item.id))
      }
    });
  }

}
