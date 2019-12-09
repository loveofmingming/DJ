import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DaohangbiZhuanchuPage } from './daohangbi-zhuanchu.page';

const routes: Routes = [
  {
    path: '',
    component: DaohangbiZhuanchuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DaohangbiZhuanchuPage]
})
export class DaohangbiZhuanchuPageModule {}
