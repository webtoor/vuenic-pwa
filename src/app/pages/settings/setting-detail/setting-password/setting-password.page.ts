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
  statusPWD;
  setPWD;
  constructor(private formBuilder: FormBuilder, public route : ActivatedRoute, public router : Router, public loading: LoaderService, public httpService: AuthService) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.statusPWD = this.router.getCurrentNavigation().extras.state.statusPWD;
      }

      console.log(this.statusPWD)

      switch (this.statusPWD) {
        case "update-password":
          this.setPWD = 0
          this.settingPasswordForm = this.formBuilder.group({
            'old_password' : [null, [Validators.required]],
            'new_password' : [null, [Validators.required]],
          });
            break;
        case "set-password":
          this.setPWD = 1
          this.settingPasswordForm = this.formBuilder.group({
            'password' : [null, [Validators.required]],
          });
            break;
        default:
          this.setPWD = 1;
          this.settingPasswordForm = this.formBuilder.group({
            'password' : [null, [Validators.required]],
          });
          break;            
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
