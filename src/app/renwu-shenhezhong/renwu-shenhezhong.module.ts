import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuShenhezhongPage } from './renwu-shenhezhong.page';
import{RenwuConPageModule} from '../renwu-con/renwu-con.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenwuConPageModule
  ],
  declarations: [RenwuShenhezhongPage],
  entryComponents: [RenwuShenhezhongPage]
})
export class RenwuShenhezhongPageModule {}
