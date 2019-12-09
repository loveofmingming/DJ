import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuWanchengPage } from './renwu-wancheng.page';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
  ],
  declarations: [RenwuWanchengPage],  
  entryComponents: [RenwuWanchengPage]
})
export class RenwuWanchengPageModule {}
