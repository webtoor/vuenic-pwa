import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailPage } from './setting-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SettingDetailPage
  },
  {
    path: 'setting-account',
    loadChildren: () => import('./setting-account/setting-account.module').then( m => m.SettingAccountPageModule)
  },
  {
    path: 'setting-address',
    loadChildren: () => import('./setting-address/setting-address.module').then( m => m.SettingAddressPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingDetailPageRoutingModule {}
