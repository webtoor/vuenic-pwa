import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(public toastController: ToastController, public menu: MenuController, private formBuilder: FormBuilder, public authService: AuthService, public router : Router) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    console.log(this.loginForm.value)
    this.authService.Postlogin(this.loginForm.value, 'login').subscribe(res => {
      console.log(res)
      if(res.access_token) {
        localStorage.setItem('bitponic-pwa', JSON.stringify(res));
        this.router.navigate(['/tabs/dashboard'], {replaceUrl: true});
      }else if(res.error){
        this.presentToast('Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',);
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
}
