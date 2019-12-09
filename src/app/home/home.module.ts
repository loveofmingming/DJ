import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// import {XiaoxiPageModule} from '../xiaoxi/xiaoxi.module';
import {XiaoxiPageModule} from '../xiaoxi/xiaoxi.module';

// import {RenwuPageModule} from '../renwu/renwu.module';
// import {DefaultPageModule} from '../default/default.module';
// import {AgreementPageModule} from '../agreement/agreement.module';
import {PrivacyPageModule} from '../privacy/privacy.module';
import {PermissionPageModule} from '../permission/permission.module';

@NgModule({
  imports: [
    // DefaultPageModule,
    // RenwuPageModule,
    XiaoxiPageModule,
    PrivacyPageModule,
    PermissionPageModule,
    // AgreementPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],

})
export class HomePageModule {}
