import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting-password',
  templateUrl: './setting-password.page.html',
  styleUrls: ['./setting-password.page.scss'],
})
export class SettingPasswordPage implements OnInit {
  userInfo
  settingPasswordForm: FormGroup;
  submitted;
  constructor(private formBuilder: FormBuilder, public route : ActivatedRoute, public router : Router, public loading: LoaderService, public httpService: AuthService) {
   
  }


  ngOnInit() {
    this.settingPasswordForm = this.formBuilder.group({
      'old_password' : [null, [Validators.required]],
      'new_password' : [null, [Validators.required]],
    });
  }

  ionViewDidEnter(){
    this.getUserInfo()

  }

  getUserInfo(){
    this.httpService.GetRequest('user-info').subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        if (res.data.password) {
         
        }
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.settingPasswordForm.invalid) {
        return;
    }
   
  }

  get f() { return this.settingPasswordForm.controls; }

}
