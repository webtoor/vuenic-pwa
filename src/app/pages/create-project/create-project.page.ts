import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  createProjectForm: FormGroup;
  provinces;
  cities;
  districts;
  projects;
  project_id;
  project_types;
  commodities;
  commodity_types;
  placeholder = "Pilih Jenis Komoditas"
  submitted = false;
  constructor(public router : Router, public loading: LoaderService, private formBuilder: FormBuilder, public httpService: AuthService) {
    this.createProjectForm = this.formBuilder.group({
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'districts_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'project_name' : [null, [Validators.required]],
      'project_id' : [null, [Validators.required]],
      'project_type_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'commodity_id' : [{
        value: null,
        disabled : true
      }, Validators.required],
      'commodity_type_id' : [{
        value: null,
        disabled : true
      }],
    });
   }

 /*  backButton(){
    this.location.back()
  } */

  ngOnInit() {
    this.getProvince();
    this.getProject()
  }

  onSubmit() {
    this.submitted = true;
    if (this.createProjectForm.invalid) {
        return;
    }
    //console.log(this.createProjectForm.value)
    this.loading.present();
    this.httpService.PostRequest(this.createProjectForm.value, 'user-project').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            refreshPage: 1,
            userProjectID : res["data"]["id"]
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    });
  }

  get f() { return this.createProjectForm.controls; }

  getProvince(){
    this.httpService.GetRequest('province').subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.provinces = res.data
      }
    });
  }

  getCity(event){
    this.createProjectForm.get('city_id').reset();
    this.createProjectForm.get('districts_id').reset();
    this.httpService.GetRequest('city/'+ event.detail.value).subscribe(res => {
      console.log(res);
      if(res.status == 200){
        this.createProjectForm.get('city_id').enable();
        this.cities = res.data
      }
    });
  }

  getDistricts(event){
    let city_id = event.detail.value
    this.createProjectForm.get('districts_id').reset();
    if(city_id){
      this.httpService.GetRequest('district/'+ event.detail.value).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.createProjectForm.get('districts_id').enable();
          this.districts = res.data
        }
      });
    }
  }

  getProject(){
    this.httpService.GetRequest('project').subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.projects = res.data
      }
    });
  }

  getProjectType(event){
    console.log(event.detail.value)
    this.project_id = event.detail.value
    this.createProjectForm.get('project_type_id').reset();
    this.createProjectForm.get('commodity_id').reset();
    this.createProjectForm.get('commodity_type_id').reset();
    this.httpService.GetRequest('project-type/' + this.project_id).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.createProjectForm.get('project_type_id').enable();
        this.project_types = res.data
      }
    });
  }

  getCommodity(event){
    console.log(event.detail.value)
    let project_type_id = event.detail.value
    this.createProjectForm.get('commodity_id').reset();
    if(project_type_id){
      this.httpService.GetRequest('commodity/' + this.project_id + '/' + project_type_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.createProjectForm.get('commodity_id').enable();
          this.commodities = res.data
        }
      });
    }
  }

  getCommodityType(event){
    console.log(event.detail.value)
    let commodity_id = event.detail.value
    this.createProjectForm.get('commodity_type_id').reset();
    if(commodity_id){
      this.httpService.GetRequest('commodity-type/' + commodity_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          if(res.data.length > 0){
            this.createProjectForm.get('commodity_type_id').enable();
            this.placeholder = "Pilih Jenis Komoditas"
            this.commodity_types = res.data
          }else{
            this.placeholder = "-"
          }
        }
      });
    }
  }



}
