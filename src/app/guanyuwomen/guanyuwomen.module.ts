import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuanyuwomenPage } from './guanyuwomen.page';

import {PrivacyPageModule} from '../privacy/privacy.module';
import {PermissionPageModule} from '../permission/permission.module';

import {HomePage} from '../home/home.page';
const routes: Routes = [
  {
    path: '',
    component: GuanyuwomenPage
  }
];

@NgModule({
  imports: [
    PermissionPageModule,
    PrivacyPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuanyuwomenPage]
})
export class GuanyuwomenPageModule {}
