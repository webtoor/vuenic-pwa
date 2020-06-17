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

}
