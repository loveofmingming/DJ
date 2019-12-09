import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PermissionPage } from './permission.page';
import {PrivacyPage} from "../privacy/privacy.page";

// const routes: Routes = [
//   {
//     path: '',
//     component: PermissionPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [PermissionPage],
  entryComponents: [PermissionPage]
})
export class PermissionPageModule {}
