import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPasswordPageRoutingModule } from './setting-password-routing.module';

import { SettingPasswordPage } from './setting-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPasswordPageRoutingModule
  ],
  declarations: [SettingPasswordPage]
})
export class SettingPasswordPageModule {}
