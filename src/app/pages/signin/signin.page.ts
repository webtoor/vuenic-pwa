import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {
  formLogin: FormGroup;
  submitted = false;
  constructor(public menu: MenuController, private formBuilder: FormBuilder, public authService: AuthService, public router : Router) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLogin.invalid) {
        return;
    }
    console.log(this.formLogin.value)
    this.authService.Postlogin(this.formLogin.value, 'login').subscribe(res => {
      console.log(res)
      if(res.access_token) {
        localStorage.setItem('bitponic-pwa', JSON.stringify(res));
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
      }
    }, (err) => {
      //this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
    });
  
  }
  get f() { return this.formLogin.controls; }

}
