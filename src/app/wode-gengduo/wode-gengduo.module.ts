import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WodeGengduoPage } from './wode-gengduo.page';

const routes: Routes = [
  {
    path: '',
    component: WodeGengduoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WodeGengduoPage]
})
export class WodeGengduoPageModule {}
