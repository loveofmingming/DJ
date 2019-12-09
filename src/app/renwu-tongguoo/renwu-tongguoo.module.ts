import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RenwuTongguooPage } from './renwu-tongguoo.page';

import {RenwuZuorenwuPageModule} from '../renwu-zuorenwu/renwu-zuorenwu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenwuZuorenwuPageModule,
  ],
  declarations: [RenwuTongguooPage],
  entryComponents: [RenwuTongguooPage]

})
export class RenwuTongguooPageModule {}
