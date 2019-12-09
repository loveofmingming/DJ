import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { XinyuzhiPage } from './xinyuzhi.page';

const routes: Routes = [
  {
    path: '',
    component: XinyuzhiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [XinyuzhiPage]
})
export class XinyuzhiPageModule {}
