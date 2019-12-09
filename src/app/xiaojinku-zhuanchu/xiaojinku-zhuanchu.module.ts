import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { XiaojinkuZhuanchuPage } from './xiaojinku-zhuanchu.page';

const routes: Routes = [
  {
    path: '',
    component: XiaojinkuZhuanchuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [XiaojinkuZhuanchuPage]
})
export class XiaojinkuZhuanchuPageModule {}
