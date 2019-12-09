import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivacyPage } from './privacy.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: PrivacyPage
//   }
// ];
// 写类似于消息这种的 要把此去掉

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)  // 去掉
  ],
  declarations: [PrivacyPage],
  entryComponents: [PrivacyPage]
})
export class PrivacyPageModule {}
