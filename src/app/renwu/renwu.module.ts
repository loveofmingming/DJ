import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular'; 

import { RenwuPage } from './renwu.page';
import {XiaoxiPageModule} from '../xiaoxi/xiaoxi.module';
import {PositionPageModule} from '../position/position.module';
import {SearchPageModule} from '../search/search.module';
// import {Search2PageModule} from '../search2/search2.module';

//import {MessagePageModule} from '../message/message.module';

const routes: Routes = [
  {
    path: '',
    component: RenwuPage,
    
    children: [
        {
            path: 'pickables',
            children: [
                {
                    path: '',
                    loadChildren: '../index/index.module#IndexPageModule'
                }
            ],

        },
        {
            path: 'mine',
            children: [
                {
                    path: '',
                    loadChildren: '../index-tab/index-tab.module#IndexTabPageModule'
                }
            ],

        },
        {
          path: 'page_error',
          children: [
              {
                  path: '',
                  loadChildren: '../no-page/no-page.module#NoPagePageModule'
              }
          ]
        },
        {
          path: '',
          redirectTo: 'pickables',
          pathMatch: 'full',


        }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XiaoxiPageModule,
    SearchPageModule,
    PositionPageModule,
    // Search2PageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RenwuPage]
})
export class RenwuPageModule {
  ionViewDidLoad(){
    console.log('model ionViewDidLoad');
  }

  ionViewWillEnter(){
    console.log('model ionViewWillEnter');
}
ionViewDidEnter(){
    console.log('model ionViewDidEnter');
}
ionViewDidLeave(){
    console.log('model ionViewDidLeave');
}
ionViewWillUnload(){
    console.log('model ionViewWillUnload');
}
ionViewCanEnter(){
    console.log('model ionViewCanEnter');
}
ionViewCanLeave(){
    console.log('model ionViewCanLeave');
}
}
