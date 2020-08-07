import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { EventsService } from '../../services/events.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  socialLogin = {
    email: '',
    fullname: '',
    provider: '',
    social_id: '',
    token: ''
  }
  githubUserInfo = {
    client_id : 'e9a252050722608e005f',
    client_secret : '61040071f17a4f9003ff5b3bdea64387d6627c45',
    code : 'ac45dbdd2de4b758abc7',
    redirect_uri : 'http://localhost:8100/signin',
  }
  clear;
  githubCode;
  socialToken;
  constructor(public route : ActivatedRoute, private authSocial: SocialAuthService, public events: EventsService, public loading: LoaderService, public toastController: ToastController, public menu: MenuController, private formBuilder: FormBuilder, public authService: AuthService, public router : Router) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });

    this.getGithubUserInfo()

    /* this.route.queryParams.subscribe(params => {
      this.githubCode = params['code'];
      this.githubUserInfo.code = this.githubCode
      console.log(this.githubCode)
      if(this.githubCode){
        this.githubLogin()
      }

      if(this.router.getCurrentNavigation().extras.state) {
         this.clear = parseInt(this.router.getCurrentNavigation().extras.state.clear);
      }
    }) */

   // this.githubLogin()

    
  }

  ionViewDidEnter(){
    const check = JSON.parse(localStorage.getItem('vuenic-pwa'));
    if(check){
      this.router.navigate(["tabs/dashboard"])
    }
  }

  signInWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authSocial.authState.subscribe(data => {
      this.socialToken = data.idToken;
      this.postSocialAuth(data)
    }); 
  }

  githubLogin(){
    this.authService.GithubPost(this.githubUserInfo).subscribe(res => {
      console.log(res)
      if(res.access_token){
        this.socialToken = res.access_token;
        localStorage.setItem('vuenic-pwa-github', JSON.stringify(res));
      }
    });
  }

  getGithubUserInfo(){
    console.log("test")
    this.authService.GithubGet('user').subscribe(res => {
      console.log(res)
      if(res.login){
        this.postSocialAuth(res)
      }
    });
  }

  postSocialAuth(data){
    //console.log(data.email)
    this.socialLogin.email = data.email;
    this.socialLogin.fullname = data.name;
    this.socialLogin.provider = data.provider;
    this.socialLogin.social_id = data.id;
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
        this.presentToast('Invalid Token',);
        this.loading.dismiss();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    //console.log(this.loginForm.value)
    this.loading.present();
    this.authService.Postlogin(this.loginForm.value, 'login').subscribe(res => {
      console.log(res)
      if(res.access_token) {
        localStorage.setItem('vuenic-pwa', JSON.stringify(res));
        this.events.publish('email', res.email);
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
        this.loading.dismiss();
      }else if(res.error){
        this.presentToast('Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',);
        this.loading.dismiss();
      }
    });
  }
  
  get f() { return this.loginForm.controls; }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  signupPage(){
    this.router.navigate(['/signup'])
  }
}
