import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import {Md5} from "ts-md5/dist/md5";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessageService } from './service/message.service';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
// import { JPush } from '@jiguang-ionic/jpush';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
// import { IonJPushModule } from 'ionic2-jpush/dist';
// import { JPushService } from 'ionic2-jpush/dist';
// import { JPush } from '@jiguang-ionic/jpush/ngx';
import { TasksModel, ToolsModel, MapModel, CameraModel, MyTasksModel, LoginModel,
   LocalStorageModel, SessionStorageModel, XiaoJinKusModel, DaoHangBisModel, XinYuZhisModel, UpdateUserInfoModel ,MyXiaoxisModel,PullWebModel, JpushUtilModel } from './model';
// import { ListscrollComponent } from './listscroll/listscroll.component';
import { RenwuWeitongguoPage } from './renwu-weitongguo/renwu-weitongguo.page';
import {PrivacyPage} from "./privacy/privacy.page";
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    // JPushService,
    // IonJPushModule,
    // AppMinimize,
    PrivacyPage,
    MessageService,
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    FileTransfer,
    File,
    Sim,
    Geolocation,
    AndroidPermissions,
    CameraModel,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TasksModel,
    MyTasksModel,
    ToolsModel,
    MapModel,
    XiaoJinKusModel,
    DaoHangBisModel,
    XinYuZhisModel,
    MapModel,
    LoginModel,
    LocalStorageModel,
    SessionStorageModel,
    UpdateUserInfoModel,
    MyXiaoxisModel,
    PullWebModel,
    JPush,
    JpushUtilModel,
    // OpenNativeSettings,
    Clipboard,
    Md5
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
