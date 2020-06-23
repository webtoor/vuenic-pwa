import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  editUserAddressForm : FormGroup;
  user_address_id;
  constructor(public formBuilder : FormBuilder, public router : Router, public route : ActivatedRoute, public httpService: AuthService) {
    this.user_address_id = this.route.snapshot.paramMap.get('user_address_id');
    this.editUserAddressForm = this.formBuilder.group({
      'address_label' : [null, [Validators.required]],
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [{
        value: null,
      }, Validators.required],
      'districts_id' : [{
        value: null,
      }, Validators.required],
      'postal_code' : [null],
    });
   }

  ngOnInit() {
    console.log("yes")
    this.getUserAddress()
  }

  getUserAddress(){
    this.httpService.GetRequest('user-address/' + this.user_address_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.editUserAddressForm.patchValue({
          'address_label' : res['data']['address_label'],
          'address' : res['data']['address'],
          'province_id' : res['data']['province_id'],
          'city_id' : res['data']['city_id'],
          'districts_id' : res['data']['districts_id'],
        }) 
      }
    });
  }

}
