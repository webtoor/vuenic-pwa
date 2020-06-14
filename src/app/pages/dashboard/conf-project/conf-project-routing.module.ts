import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfProjectPage } from './conf-project.page';

const routes: Routes = [
  {
    path: '',
    component: ConfProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfProjectPageRoutingModule {}
