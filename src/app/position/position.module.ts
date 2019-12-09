import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// import { XiaoxiPage } from './xiaoxi.page';
import { PositionPage } from './position.page';


import { RenwuShenhezhongPageModule} from '../renwu-shenhezhong/renwu-shenhezhong.module';
import { RenwuZuorenwuPageModule} from '../renwu-zuorenwu/renwu-zuorenwu.module';
import { RenwuUpdateTishiPageModule} from '../renwu-update-tishi/renwu-update-tishi.module';

import { RenwuWanchengPageModule} from '../renwu-wancheng/renwu-wancheng.module';
import { RenwuTongguoPageModule} from '../renwu-tongguo/renwu-tongguo.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RenwuShenhezhongPageModule,
        RenwuZuorenwuPageModule,
        RenwuUpdateTishiPageModule,
        RenwuWanchengPageModule,
        RenwuTongguoPageModule
    ],
    declarations: [PositionPage],
    entryComponents: [PositionPage]
})
export class PositionPageModule {}
