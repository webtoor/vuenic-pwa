import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailPage } from './setting-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SettingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingDetailPageRoutingModule {}
