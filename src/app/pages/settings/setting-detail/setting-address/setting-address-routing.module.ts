import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingAddressPage } from './setting-address.page';

const routes: Routes = [
  {
    path: '',
    component: SettingAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAddressPageRoutingModule {}
