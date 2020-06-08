import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  createProjectForm: FormGroup;
  projects;
  project_id;
  project_types;
  commodities;
  commodity_types;
  constructor(private formBuilder: FormBuilder, public httpService: AuthService) {
    this.createProjectForm = this.formBuilder.group({
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
      }, Validators.required],
    });
   }

  ngOnInit() {
    this.getProject()
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
      this.httpService.GetRequest('commodity/' + this.project_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.createProjectForm.get('commodity_id').enable();
          this.commodities = res.data
        }
      });
    }
  }

 /*  getCommodityType(event){
    console.log(event.detail.value)
    let commodity_id = event.detail.value
    this.createProjectForm.get('commodity_id').reset();
      this.httpService.GetRequest('commodity-type/' + commodity_id).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.createProjectForm.get('commodity_id').enable();
          this.commodities = res.data
        }
      });
  } */

}
