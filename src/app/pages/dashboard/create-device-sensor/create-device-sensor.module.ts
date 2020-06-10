import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDeviceSensorPageRoutingModule } from './create-device-sensor-routing.module';

import { CreateDeviceSensorPage } from './create-device-sensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDeviceSensorPageRoutingModule
  ],
  declarations: [CreateDeviceSensorPage]
})
export class CreateDeviceSensorPageModule {}
