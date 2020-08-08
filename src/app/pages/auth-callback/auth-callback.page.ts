import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.page.html',
  styleUrls: ['./auth-callback.page.scss'],
})
export class AuthCallbackPage implements OnInit {
  socialLogin = {
    email: '',
    fullname: '',
    provider: '',
    social_id: '',
    token: ''
  }
  githubParams = {
    client_id : 'e9a252050722608e005f',
    client_secret : '61040071f17a4f9003ff5b3bdea64387d6627c45',
    code : '',
    redirect_uri : 'http://localhost:8100/auth/github/callback',
  }
  clear;
  githubCode;
  socialToken;
  socialProvider;
  constructor(public router : Router, public route : ActivatedRoute, public authService: AuthService, public events: EventsService, public loading: LoaderService, public toastController: ToastController, public menu: MenuController, ) {
    this.menu.enable(false);
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.githubCode = params['code'];
      this.githubParams.code = this.githubCode
      console.log(this.githubParams)
      if(this.githubCode){
        this.githubLogin()
      }
    }) 
  }

  githubLogin(){
    this.authService.GithubPost(this.githubParams, 'login/oauth/access_token').subscribe(res => {
      //console.log(res)
      if(res.access_token){
        this.socialToken = res.access_token;
        localStorage.setItem('vuenic-github', JSON.stringify(res));
        this.getGithubUserInfo()
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
        this.presentToast('Invalid Token',);
        this.loading.dismiss();
      }
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
