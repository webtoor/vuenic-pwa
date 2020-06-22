import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingAccountPage } from './setting-account.page';

const routes: Routes = [
  {
    path: '',
    component: SettingAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAccountPageRoutingModule {}
