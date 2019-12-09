import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuUpdateTishiPage } from './renwu-update-tishi.page';
import{RenwuConPageModule} from '../renwu-con/renwu-con.module';
import{RenwuUpdatePageModule} from '../renwu-update/renwu-update.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenwuConPageModule,
    RenwuUpdatePageModule
  ],
  declarations: [RenwuUpdateTishiPage],
  entryComponents: [RenwuUpdateTishiPage]
})
export class RenwuUpdateTishiPageModule {}
