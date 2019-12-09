import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RenwuWeitongguoPage } from './renwu-weitongguo.page';


// const routes: Routes = [
//   {
//     path: '',
//     component: RenwuWeitongguoPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [RenwuWeitongguoPage],
  entryComponents: [RenwuWeitongguoPage]
})
export class RenwuWeitongguoPageModule {}
