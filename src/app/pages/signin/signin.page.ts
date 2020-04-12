import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {
  formLogin: FormGroup;
  submitted = false;
  constructor(public menu: MenuController, private formBuilder: FormBuilder) { 
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

  
  }
  get f() { return this.formLogin.controls; }

}
