import { Component , ViewChild  } from '@angular/core';
// import { ToastController, NavController , IonApp, IonTabs , } from '@ionic/angular';

// import { Keyboard } from '@ionic-native/keyboard';

import { DefaultPage } from './default/default.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { sqliteServiceModel , ToolsModel, JpushUtilModel } from './model';
import { RenwuPage } from './renwu/renwu.page';
import { Platform , AlertController , NavController , ToastController  } from '@ionic/angular';
// import { Router , NavController  } from '@angular/router';
import {Router, NavigationEnd} from '@angular/router';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [AppMinimize ]
})
export class AppComponent {
    userId: any;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
    sideMenuDisabled = true;
    backButtonPressed: boolean = false; // 用于判断返回键是否触发
    customBackActionSubscription: Subscription;
    url;
    // @ViewChild('Nav', { static: true }) nav: NavController;
    // @ViewChild('myNav', { static: true }) nav: NavController;
  constructor(

      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private router: Router,
      private alertController: AlertController,
      private appMinimize: AppMinimize,
      public toastCtrl: ToastController,
      // public keyBoard: Keyboard,
      // public ionicApp: IonApp,
      // private platform: Platform,
      // private splashScreen: SplashScreen,
      // private sqliteServiceModel: sqliteServiceModel,
      public toolsmodel: ToolsModel,
      public jpush: JPush,
      public JpushUtilModel: JpushUtilModel,
      public navController: NavController, // 导航控制器
      public toastController: ToastController,
      // private statusBar: StatusBar
    ) {
    this.initializeApp();
    this.backButtonEvent();
    // this.initRouterListen();
  }
    private keyValue: any = false; // 判断是否返回上一界面

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.splashScreen.show();
      this.keyboardEvent();
      setTimeout( () => {
            this.splashScreen.hide();
        }, 1000);  // 延迟关闭，解决退出后登录白屏
        // this.platform.resume.subscribe(); // 弹出框
      // this.statusBar.styleDefault();
      // this.sqliteServiceModel.initDB();
      if (this.toolsmodel.isAndroids()) {
        /*极光推送开启 */
        this.jpush.setDebugMode(true);
        this.jpush.init()
        // this.jpush.stopPush();
        /*消息推送配置**/
        this.JpushUtilModel.initPush(); // 监听初始化
          // this.JpushUtilModel.getAlias()
          // alert(this.userId)
          // console.log(this.userId, 'this.userId');
          // this.JpushUtilModel.setAlias(this.userId);    // 设置别名
          // (this.jpush.init() as any).then(res=>{
          //    alert('成功'+ JSON.stringify('res'));
          // }).catch(err=>{
          //     alert('失败'+ JSON.stringify('err'));
          // })
      }
    });
  }
// android通过返回按钮退出应用
//     lastTimeBackPress = 0;
//     timePeriodToExit = 2000;

  backButtonEvent() {
      const that = this;
      this.platform.backButton.subscribe(() => {
          if (that.keyValue) {
              that.keyValue = false; // 触发返回键操作，当为true时不返回上一界面
              // alert('123')
              return;
          }
          if (this.router.url.indexOf('home') > -1 || this.router.url.indexOf('default') > -1 || this.router.url.indexOf('default/wode') > -1) {
              if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                  // navigator['app'].exitApp(); // 退出APP
                  this.appMinimize.minimize(); // 最小化App
              } else {
                  // this.presentAlertConfirm();
                  // this.presentToast('再按一次退出应用');
                  this.lastTimeBackPress = new Date().getTime();
              }
              // navigator['app'].exitApp(); //ionic4 退出APP的方法
          }
      });
   /*this.platform.backButton.subscribe(() => {
       // let activeVC = this.nav.getActive();
      if (this.url === '/' || this.url === '/default/renwu/pickables' || this.url === '/default/renwu/mine' || '/default/wode' || '/home') {
        console.log('jinlai');
        // this.appMinimize.minimize();
        if (this.backButtonPressed) {
          this.appMinimize.minimize();
          this.backButtonPressed = false;
        } else {
          // alert('再按一次退出应用');
          // this.presentToast('再按一次退出应用');
          //   this.presentAlertConfirm()
          this.backButtonPressed = true;
          setTimeout(() => this.backButtonPressed = false, 2000);
        }
     // navigator['app'].exitApp(); //ionic4 退出APP的方法
      } else {
        alert('back');
        this.appMinimize.minimize();
        // this.navController.back();
      }

    });*/
  }
  async presentAlertConfirm() {
        const alert = await this.alertController.create({
            // header: 'Confirm!',
            message: '您要退出APP吗?',
            cssClass: 'gongsi',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'primary',
                    handler: (blah) => {
                    }
                }, {
                    text: '退出',
                    cssClass: 'sure',
                    handler: () => {
                        // navigator['app'].exitApp();
                        this.appMinimize.minimize(); // 最小化App
                    }
                }
            ]
        });

        await alert.present();
    }
  async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle',
        });
        toast.present();
    }

    keyboardEvent() { // 键盘触发
      // alert('chufa')
        const that = this;
        window.addEventListener('native.keyboardshow', () => {
            that.keyValue = true; // 键盘开启改变属性
            // alert('show')
        });
        window.addEventListener('native.keyboardhide', () => {
            setTimeout(() => { that.keyValue = false; }, 200) ; // 延时器
        });
    }
  // initRouterListen() {
  //   // alert('router')
  //   this.router.events.subscribe(event => { // 需要放到最后一个执行
  //     if (event instanceof NavigationEnd) {
  //       this.url = event.url;
  //     }
  //   });
  // }
/*
  registerBackButtonAction() {
    this.platform.backButton.subscribe(() => {
      if (this.keyBoard.isOpen()) {
        this.keyBoard.close();
      } else {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        // 此处if是rootPage为登录页的情况，else是rootPage为TabsPage（如果不需要判断登录页的情况直接用else内的代码即可）
        if (!(page instanceof RenwuPage)) {
          if (!this.nav.back) {
            console.log('检测到在根视图点击了返回按钮');
            this.showExit();
          } else {
            console.log('检测到在子路径中点击了返回按钮。');
            this.nav.pop();
          }
        }
      }
    }, 1000);
  }

 async showExit() {
    if (this.backButtonPressed) {  // 当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
       const toast = await this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'middle',
        cssClass: 'tip' // 修改样式（根据需要添加）
      });
      toast.present()
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000); // 2秒内没有再次点击返回则将触发标志标记为false
    }
  }*/

}
