import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { YijianFankuiPage } from './yijian-fankui.page';

const routes: Routes = [
  {
    path: '',
    component: YijianFankuiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YijianFankuiPage]
})
export class YijianFankuiPageModule {}
