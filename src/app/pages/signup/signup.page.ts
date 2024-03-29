import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  socialUser: SocialUser;
  submitted = false;
  hidden = false;
  socialLogin = {
    email: '',
    fullname: '',
    provider: '',
    social_id: '',
    token: ''
  }
  socialToken;
  socialProvider;
  showPassword = false;
  passwordToggleIcon = "eye";
  constructor(public route : ActivatedRoute, private authSocial: SocialAuthService, public events: EventsService, public loading: LoaderService, private formBuilder: FormBuilder, public menu: MenuController,public authService: AuthService, public router : Router, public toastController: ToastController) {
    this.menu.enable(false);
    this.signupForm = this.formBuilder.group({
      'role' : [1, Validators.required],
      'fullname' : [null, Validators.required],
      'phonenumber' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
   }

  ngOnInit() {
    this.authSocial.authState.subscribe(data => {
        this.socialUser = data;
        if(this.socialUser){
          this.socialProvider = "GOOGLE";
          this.postSocialAuth(data)
        }
    }); 
  }

  ionViewWillEnter(){
    const check = JSON.parse(localStorage.getItem('vuenic-pwa'));
    if(check){
      this.router.navigate(["tabs/dashboard"])
    }
  }

  signUpWithGithub(){
    window.location.href='https://github.com/login/oauth/authorize?scope=user&email&client_id=e9a252050722608e005f&redirect_uri=https://apps.vuenic.com/auth/github/callback';
  }


  signUpWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  postSocialAuth(data){
    //console.log(data.email)
    this.socialLogin.email = data.email;
    this.socialLogin.fullname = data.name;
    this.socialLogin.provider = this.socialProvider;
    this.socialLogin.social_id = data.id.toString();
    this.socialLogin.token = this.socialToken;

    //console.log(this.socialLogin)
    this.loading.present();
    this.authService.Postlogin(this.socialLogin, 'social-login').subscribe(res => {
      //console.log(res)
      if(res.access_token) {
        localStorage.setItem('vuenic-pwa', JSON.stringify(res));
        this.events.publish('email', res.email);
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
        this.loading.dismiss();
      }else if(res.error){
        this.presentToast('Invalid Token', "bottom");
        this.loading.dismiss();
      }
    });
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
    
    //console.log(this.signupForm.value)
    this.loading.present();
    this.authService.Postsignup(this.signupForm.value, 'signup').subscribe(res => {
      //console.log(res)
      if(res.status == 201) {
        this.submitted = false;
        this.signupForm.reset()
        this.presentToast("Terima kasih. Anda telah berhasil daftar. Silakan Login", "top");
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

  togglePassword():void{
    this.showPassword = !this.showPassword
    if(this.passwordToggleIcon == "eye"){
      this.passwordToggleIcon = "eye-off";
    }else{
      this.passwordToggleIcon = "eye";
    }
  }
}
