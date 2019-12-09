import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuChoulaoPage } from './renwu-choulao.page';

const routes: Routes = [
  {
    path: '',
    component: RenwuChoulaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RenwuChoulaoPage]
})
export class RenwuChoulaoPageModule {}
