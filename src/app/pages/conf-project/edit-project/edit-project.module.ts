import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProjectPageRoutingModule } from './edit-project-routing.module';

import { EditProjectPage } from './edit-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProjectPageRoutingModule
  ],
  declarations: [EditProjectPage]
})
export class EditProjectPageModule {}
