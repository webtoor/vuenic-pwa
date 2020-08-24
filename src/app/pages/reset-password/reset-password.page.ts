import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPWDForm: FormGroup;
  resetCodeForm: FormGroup;

  submitted;
  resetPassword = true
  verifyEmail = false
  constructor(public toastController : ToastController, private formBuilder: FormBuilder, public httpService : AuthService) { }

  ngOnInit() {
    this.resetPWDForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
    });
    this.resetCodeForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'code' : [null, [Validators.required]],
    });
  }

  checkEmail() {
    this.submitted = true;
    if (this.resetPWDForm.invalid) {
        return;
    }
    console.log(this.resetPWDForm.value)
    this.httpService.PostRequest(this.resetPWDForm.value, 'verify-code-reset').subscribe(res => {
      console.log(res)
      if(res.status == 200){
        this.resetPassword = false
        this.verifyEmail = true

      }else{
        this.presentToast(res.message)
      }
  
    });
  }
  
  get f() { return this.resetPWDForm.controls; }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
