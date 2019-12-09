import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenwuGuoqiPage } from './renwu-guoqi.page';




// const routes: Routes = [
//   {
//     path: '',
//     component: RenwuGuoqiPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [RenwuGuoqiPage],
  entryComponents: [RenwuGuoqiPage]
})
export class RenwuGuoqiPageModule {}
