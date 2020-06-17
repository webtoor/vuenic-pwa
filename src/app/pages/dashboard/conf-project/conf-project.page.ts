import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conf-project',
  templateUrl: './conf-project.page.html',
  styleUrls: ['./conf-project.page.scss'],
})
export class ConfProjectPage implements OnInit {
  EditProjectForm : FormGroup;
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
  cityIsEnabled = true;

  constructor(public router: Router, private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) { 
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.EditProjectForm = this.formBuilder.group({
      'address' : [null, [Validators.required]],
      'province_id' : [null, [Validators.required]],
      'city_id' : [null, Validators.required],
      'districts_id' : [{
        value: null,
      }, Validators.required],
      'project_name' : [null, [Validators.required]],
      'project_id' : [null, [Validators.required]],
      'project_type_id' : [{
        value: null,
      }, Validators.required],
      'commodity_id' : [{
        value: null,
      }, Validators.required],
      'commodity_type_id' : [{
        value: null,
      }],
    });
  }

  ngOnInit() {
   
  }

  editLocation(){
    this.router.navigate(["tabs/dashboard/conf-project/" + this.user_project_id + "/edit-location/" + this.user_project_id])
  }

  editUserProject(){
    this.router.navigate(["tabs/dashboard/conf-project/" + this.user_project_id + "/edit-project/" + this.user_project_id])
  }
  onSubmit() {
    this.submitted = true;
    if (this.EditProjectForm.invalid) {
        return;
    }
    console.log(this.EditProjectForm.value)
    /* this.httpService.PostRequest(this.EditProjectForm.value, 'create-project').subscribe(res => {
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

  get f() { return this.EditProjectForm.controls; }


  getUserProject(){
    this.httpService.GetRequest('user-project/' + this.user_project_id).subscribe(res => {
      console.log(res['data']['project_location']['city_id']);
      if(res.status == 200){
        console.log("true")
        this.EditProjectForm.patchValue({
          'address' : res['data']['project_location']['address'],
          'province_id' : res['data']['project_location']['province_id'],
          'city_id' : res['data']['project_location']['city_id'],
          'districts_id' : res['data']['project_location']['districts_id'],
          'project_name' : res['data']['project_name'],
          'project_id' : res['data']['project_id'],
          'project_type_id' : res['data']['project_type_id'],
          'commodity_id' : res['data']['commodity_id'],
          'commodity_type_id' : res['data']['commodity_type_id'],
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
    this.EditProjectForm.get('project_type_id').reset();
    this.EditProjectForm.get('commodity_id').reset();
    this.EditProjectForm.get('commodity_type_id').reset();
    this.httpService.GetRequest('project-type/' + this.project_id).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.EditProjectForm.get('project_type_id').enable();
        this.project_types = res.data
      }
    });
  }

  getCommodity(event){
    console.log(event.detail.value)
    let project_type_id = event.detail.value
    this.EditProjectForm.get('commodity_id').reset();
    if(project_type_id){
      this.httpService.GetRequest('commodity/' + this.project_id + '/' + project_type_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.EditProjectForm.get('commodity_id').enable();
          this.commodities = res.data
        }
      });
    }
  }

  getCommodityType(event){
    console.log(event.detail.value)
    let commodity_id = event.detail.value
    this.EditProjectForm.get('commodity_type_id').reset();
    if(commodity_id){
      this.httpService.GetRequest('commodity-type/' + commodity_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.EditProjectForm.get('commodity_type_id').enable();
          this.commodity_types = res.data
        }
      });
    }
  }

}
