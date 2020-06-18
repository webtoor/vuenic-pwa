import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
/* import { LoaderService } from 'src/app/services/loader.service'; */

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {
  EditProjectLocationForm : FormGroup;
  user_project_id;
  submitted = false;
  provinces : any;
  cities;
  districts;
  kotaIsEnabled = true;
  kecamatanIsEnabled = true;

  constructor(private _ngZone: NgZone, /* public loading: LoaderService, */ private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) {
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.EditProjectLocationForm = this.formBuilder.group({
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [null, Validators.required],
      'districts_id' : [null, Validators.required]
    });
   }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
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
    //this.loading.present();
    this.httpService.GetRequest('project-location/' + this.user_project_id).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.EditProjectLocationForm.patchValue({
          'address' : res['data']['address'],
          'province_id' : res['data']['province_id'],
          'city_id' : res['data']['city_id'],
          'districts_id' : res['data']['districts_id'],
        }) 
      }
      //this.loading.dismiss();
    });
  }

  getProvince(){
    //this.loading.present();
    this.httpService.GetRequest('province').subscribe(res => {
      console.log(res);
      if(res.status == 200){
          this.provinces = res.data
      }
      //this.loading.dismiss();
    });
  }

  getCity(event){
    //this.loading.present();
    this.kotaIsEnabled = true;
    this.kecamatanIsEnabled = true;
    this.cities = null;
    this.httpService.GetRequest('city/'+ event.detail.value).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
          this.kotaIsEnabled = false;
          this.cities = res.data
      }
      //this.loading.dismiss();
    });
  }

  getDistricts(event){
    //this.loading.present();
    this.kecamatanIsEnabled = true;
    this.districts = null;
    let city_id = event.detail.value
    if(city_id){
      this.httpService.GetRequest('district/'+ event.detail.value).subscribe(res => {
        //console.log(res);
        if(res.status == 200){
          this.kecamatanIsEnabled = false;
          this.districts = res.data
        }
        //this.loading.present();
      });
    }
  }
}
