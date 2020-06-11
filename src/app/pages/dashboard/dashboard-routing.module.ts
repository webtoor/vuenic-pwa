import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'create-project',
    loadChildren: () => import('./create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: 'create-device-sensor/:user_project_id',
    loadChildren: () => import('./create-device-sensor/create-device-sensor.module').then( m => m.CreateDeviceSensorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
