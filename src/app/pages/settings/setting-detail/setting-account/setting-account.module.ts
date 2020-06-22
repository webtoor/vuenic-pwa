import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingAccountPageRoutingModule } from './setting-account-routing.module';

import { SettingAccountPage } from './setting-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingAccountPageRoutingModule
  ],
  declarations: [SettingAccountPage]
})
export class SettingAccountPageModule {}
