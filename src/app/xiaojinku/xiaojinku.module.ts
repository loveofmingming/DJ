import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { XiaojinkuPage } from './xiaojinku.page';

const routes: Routes = [
  {
    path: '',
    component: XiaojinkuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [XiaojinkuPage]
})
export class XiaojinkuPageModule {}
