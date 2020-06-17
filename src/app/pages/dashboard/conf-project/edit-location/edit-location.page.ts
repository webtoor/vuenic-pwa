import { Component, OnInit, NgZone } from '@angular/core';
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
  user_project_id;
  submitted = false;
  provinces;
  cities;
  districts;
  projects;
  project_id;
  project_types;
  commodities;
  commodity_types;
  constructor(private _ngZone: NgZone, private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) {
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
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
    this.getProvince()
    this.getUserProject()
  }

  onSubmit() {
    this.submitted = true;
    if (this.EditProjectLocationForm.invalid) {
        return;
    }
    console.log(this.EditProjectLocationForm.value)
    /* this.httpService.PostRequest(this.EditProjectLocationForm.value, 'create-project').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          queryParams: {
            refreshPage: 1,
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    }); */
  }

  get f() { return this.EditProjectLocationForm.controls; }


  getUserProject(){
    this.httpService.GetRequest('user-project/' + this.user_project_id).subscribe(res => {
      console.log(res['data']['project_location']['city_id']);
      if(res.status == 200){
             
            this.EditProjectLocationForm.patchValue({
              'address' : res['data']['project_location']['address'],
              'province_id' : res['data']['project_location']['province_id'],
              'city_id' : res['data']['project_location']['city_id'],
              'districts_id' : res['data']['project_location']['districts_id'],
            }) 
    
     
      }
    });
  }

  getProvince(){
    this.httpService.GetRequest('province').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.provinces = res.data
      }
    });
  }

  getCity(event){
    this.httpService.GetRequest('city/'+ event.detail.value).subscribe(res => {
      console.log(res);
      if(res.status == 200){
          this.cities = res.data
      }
    });
  }

  getDistricts(event){
    let city_id = event.detail.value
    if(city_id){
      this.httpService.GetRequest('district/'+ event.detail.value).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.districts = res.data
        }
      });
    }
  }
}
