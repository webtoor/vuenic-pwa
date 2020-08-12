import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.page.html',
  styleUrls: ['./delete-confirm.page.scss'],
})
export class DeleteConfirmPage implements OnInit {
  deleteConfirmForm: FormGroup;
  funcStatus;
  submitted;
  projectDeviceID;
  sensorID;
  userProjectID;
  constructor(public loading: LoaderService, private formBuilder: FormBuilder, public route : ActivatedRoute, public router: Router, public httpService : AuthService) {
    this.deleteConfirmForm = this.formBuilder.group({
      'sensor_id' : null,
      'project_device_id' : null,
      'password' : [null, Validators.required],
    }); 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.funcStatus = this.router.getCurrentNavigation().extras.state.funcStatus;
        this.projectDeviceID = parseInt(this.router.getCurrentNavigation().extras.state.projectDeviceID);
        this.sensorID = parseInt(this.router.getCurrentNavigation().extras.state.sensorID);
        this.userProjectID = parseInt(this.router.getCurrentNavigation().extras.state.userProjectID);

        this.deleteConfirmForm.patchValue({
          sensor_id : this.sensorID,
          project_device_id : this.projectDeviceID
        })
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.deleteConfirmForm.invalid) {
        return;
    }
    
    console.log(this.deleteConfirmForm.value)
    this.loading.present();
    this.httpService.deletePostRequest(this.deleteConfirmForm.value, 'sensor').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        let navigationExtras: NavigationExtras = {
          replaceUrl: true,
          state: {
            refreshPage: 1,
            userProjectID : this.userProjectID,
            devicePosition : this.projectDeviceID
          }
        };
        this.router.navigate(['/tabs/dashboard'], navigationExtras);
        this.loading.dismiss();
      }
    });
  }
}
