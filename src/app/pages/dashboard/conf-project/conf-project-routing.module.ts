import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfProjectPage } from './conf-project.page';

const routes: Routes = [
  {
    path: '',
    component: ConfProjectPage
  },
  {
    path: 'edit-location/:user_project_id',
    loadChildren: () => import('./edit-location/edit-location.module').then( m => m.EditLocationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfProjectPageRoutingModule {}
