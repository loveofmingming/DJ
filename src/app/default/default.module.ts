import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DefaultPage } from './default.page';
import {DefaultPageRoutingModule} from './default.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultPageRoutingModule
  ],
  declarations: [DefaultPage]
})
export class DefaultPageModule {}
