import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.page.html',
  styleUrls: ['./add-sensor.page.scss'],
})
export class AddSensorPage implements OnInit {
  addSensorForm : FormGroup
  useSensor;
  constructor(public route : ActivatedRoute, public router : Router, private formBuilder: FormBuilder) {
    this.addSensorForm = this.formBuilder.group({
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        console.log(Object.values(params))
    });
  }
  

}
