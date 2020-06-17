import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {
  EditUserProjectForm : FormGroup;
  user_project_id;
  submitted = false;
  projects;
  project_id;
  project_types;
  commodities;
  commodity_types;

  constructor(public router: Router, private formBuilder: FormBuilder, public httpService: AuthService, public route : ActivatedRoute) { 
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
    this.EditUserProjectForm = this.formBuilder.group({
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
    this.getProject()
    this.getUserProject()
  }

  onSubmit() {
    this.submitted = true;
    if (this.EditUserProjectForm.invalid) {
        return;
    }
    console.log(this.EditUserProjectForm.value)
    /* this.httpService.PostRequest(this.EditUserProjectForm.value, 'create-project').subscribe(res => {
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

  get f() { return this.EditUserProjectForm.controls; }

  getUserProject(){
    this.httpService.GetRequest('user-project/' + this.user_project_id).subscribe(res => {
      console.log(res['data']['project_location']['city_id']);
      if(res.status == 200){
        console.log("true")
        this.EditUserProjectForm.patchValue({
          'project_name' : res['data']['project_name'],
          'project_id' : res['data']['project_id'],
          'project_type_id' : res['data']['project_type_id'],
          'commodity_id' : res['data']['commodity_id'],
          'commodity_type_id' : res['data']['commodity_type_id'],
        }) 
      }
    });
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
    this.EditUserProjectForm.get('project_type_id').reset();
    this.EditUserProjectForm.get('commodity_id').reset();
    this.EditUserProjectForm.get('commodity_type_id').reset();
    this.httpService.GetRequest('project-type/' + this.project_id).subscribe(res => {
      //console.log(res);
      if(res.status == 200){
        this.EditUserProjectForm.get('project_type_id').enable();
        this.project_types = res.data
      }
    });
  }

  getCommodity(event){
    console.log(event.detail.value)
    let project_type_id = event.detail.value
    this.EditUserProjectForm.get('commodity_id').reset();
    if(project_type_id){
      this.httpService.GetRequest('commodity/' + this.project_id + '/' + project_type_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.EditUserProjectForm.get('commodity_id').enable();
          this.commodities = res.data
        }
      });
    }
  }

  getCommodityType(event){
    console.log(event.detail.value)
    let commodity_id = event.detail.value
    this.EditUserProjectForm.get('commodity_type_id').reset();
    if(commodity_id){
      this.httpService.GetRequest('commodity-type/' + commodity_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.EditUserProjectForm.get('commodity_type_id').enable();
          this.commodity_types = res.data
        }
      });
    }
  }

}
