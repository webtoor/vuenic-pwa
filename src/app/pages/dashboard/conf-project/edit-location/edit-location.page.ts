import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {
  EditProjectLocationForm : FormGroup;

  constructor(private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) {
    this.EditProjectLocationForm = this.formBuilder.group({
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [null, Validators.required],
      'districts_id' : [{
        value: null,
      }, Validators.required]
    });
   }

  ngOnInit() {
  }

}
