import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  constructor(public loading: LoaderService, private formBuilder: FormBuilder, public menu: MenuController,public authService: AuthService, public router : Router, public toastController: ToastController) {
    this.menu.enable(false);
    this.signupForm = this.formBuilder.group({
      'fullname' : [null, Validators.required],
      'phonenumber' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
        return;
    }
    if(this.signupForm.value.phonenumber.toString()[0] != "6" && this.signupForm.value.phonenumber.toString()[1] != "2"){
      this.signupForm.patchValue({
        phonenumber : "62" + this.signupForm.value.phonenumber.toString(),
      })
    }else{
      this.signupForm.patchValue({
        phonenumber : this.signupForm.value.phonenumber.toString(),
      })
    }
    
    console.log(this.signupForm.value)
    this.loading.present();
    this.authService.Postsignup(this.signupForm.value, 'signup').subscribe(res => {
      console.log(res)
      if(res.status == 201) {
        this.submitted = false;
        this.signupForm.reset()
        this.presentToast("Terima kasih. Anda telah berhasil daftar. Silakan Login", "bottom");
        this.signinPage()
        this.loading.dismiss();
      }else if(res.error){
        this.presentToast(res.error, 'bottom');
        this.loading.dismiss();
      }
    });
  }

  get f() { return this.signupForm.controls; }
  async presentToast(msg, position) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: position
    });
    toast.present();
  }

  signinPage(){
    this.router.navigate(['/signin'])
  }
}
