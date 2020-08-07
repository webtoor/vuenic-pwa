import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastController, MenuController } from '@ionic/angular';
import { EventsService } from '../../services/events.service';
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
  githubParams = {
    client_id : '2510ae126aed8ad39ed9',
    client_secret : '617a3cf58ed707dc548772bbc8045a8aec1a23e6',
    code : '',
    redirect_uri : 'http://localhost:8100/signup',
  }
  clear;
  githubCode;
  socialToken;
  socialProvider;
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
        this.postSocialAuth(data)
    }); 
    this.route.queryParams.subscribe(params => {
      this.githubCode = params['code'];
      this.githubParams.code = this.githubCode
      console.log(this.githubParams)
      if(this.githubCode){
        this.githubLogin()
      }
    })  
  }

  ionViewWillEnter(){
    const check = JSON.parse(localStorage.getItem('vuenic-pwa'));
    if(check){
      this.router.navigate(["tabs/dashboard"])
    }
  }

  signUpWithGithub(){
    window.location.href='https://github.com/login/oauth/authorize?scope=user&email&client_id=2510ae126aed8ad39ed9&redirect_uri=http://localhost:8100/signup';
  }

  githubLogin(){
    this.loading.present();
    this.authService.GithubPost(this.githubParams, 'login/oauth/access_token').subscribe(res => {
      //console.log(res)
      if(res.access_token){
        this.socialToken = res.access_token;
        localStorage.setItem('vuenic-github', JSON.stringify(res));
        this.getGithubUserInfo()
        this.loading.dismiss();
      }
    });
  }

  getGithubUserInfo(){
    this.loading.present();
    this.authService.GithubGet('user').subscribe(res => {
      //console.log(res)
      if(res.login){
        this.socialProvider = "GITHUB";
        this.postSocialAuth(res)
        this.loading.dismiss();
        localStorage.removeItem('vuenic-github')
      }
    });
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
      console.log(res)
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
    
    console.log(this.signupForm.value)
    this.loading.present();
    this.authService.Postsignup(this.signupForm.value, 'signup').subscribe(res => {
      console.log(res)
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

  signUpWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
