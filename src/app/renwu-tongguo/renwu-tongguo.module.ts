import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RenwuTongguoPage } from './renwu-tongguo.page';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [RenwuTongguoPage],
  entryComponents: [RenwuTongguoPage]

})
export class RenwuTongguoPageModule {}
