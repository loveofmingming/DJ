import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuUpdatePage } from './renwu-update.page';

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
  ],
  declarations: [RenwuUpdatePage],
  entryComponents: [RenwuUpdatePage]
})
export class RenwuUpdatePageModule {}
