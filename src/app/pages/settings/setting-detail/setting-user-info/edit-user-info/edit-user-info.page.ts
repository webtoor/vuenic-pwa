import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.page.html',
  styleUrls: ['./edit-user-info.page.scss'],
})
export class EditUserInfoPage implements OnInit {
  EditUserInfoForm: FormGroup;
  formName;
  labelName;
  userInfoType;
  constructor(private formBuilder: FormBuilder, public route : ActivatedRoute, public router: Router,) { 
   
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userInfoType = this.router.getCurrentNavigation().extras.state.userInfoType;
      }

      switch (this.userInfoType) {
        case 1:
            this.labelName = "Nama Lengkap"
            this.formName = "fullname"
            this.EditUserInfoForm = this.formBuilder.group({
              'fullname' : [null, [Validators.required]],
            });
            break;
        case 2:
            this.labelName = "Tanggal Lahir";
            this.formName = "dateofbirth";
            this.EditUserInfoForm = this.formBuilder.group({
              'dateofbirth' : [null, [Validators.required]],
            });
            break;
        case 3:
            this.labelName = "Jenis Kelamin";
            this.formName = "gender";
            this.EditUserInfoForm = this.formBuilder.group({
              'gender' : [null, [Validators.required]],
            });
            break;
        case 4:
            this.labelName = "Email";
            this.formName = "email";
            this.EditUserInfoForm = this.formBuilder.group({
              'email' : [null, [Validators.required, Validators.email]],
            });
            break;
        case 5:
            this.labelName = "Nomor Ponsel";
            this.formName = "phonenumber";
            this.EditUserInfoForm = this.formBuilder.group({
              'phonenumber' : [null, [Validators.required]],
            });
            break;
        default:
          this.labelName = "Nama Lengkap"
          this.formName = "fullname"
          this.EditUserInfoForm = this.formBuilder.group({
            'fullname' : [null, [Validators.required]],
          });
          break;            
      }    
    });
  }

}
