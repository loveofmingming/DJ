import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuanyuwomenPage } from './guanyuwomen.page';

const routes: Routes = [
  {
    path: '',
    component: GuanyuwomenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuanyuwomenPage]
})
export class GuanyuwomenPageModule {}
