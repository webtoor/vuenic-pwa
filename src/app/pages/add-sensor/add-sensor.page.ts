import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.page.html',
  styleUrls: ['./add-sensor.page.scss'],
})
export class AddSensorPage implements OnInit {
  addSensorForm : FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.addSensorForm = this.formBuilder.group({
      'sensor_id' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
  }

}
