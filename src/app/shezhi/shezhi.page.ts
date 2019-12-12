import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';           // 跳转类库
import { LoginModel, LocalStorageModel, ToolsModel , JpushUtilModel} from '../model';
import { ToastController} from '@ionic/angular';   //弹窗类库
// import { AlertController } from '@ionic/angular';
// import { ModalController, NavParams } from '@ionic/angular';
declare var Wechat: any;
@Component({
  selector: 'app-shezhi',
  templateUrl: './shezhi.page.html',
  styleUrls: ['./shezhi.page.scss'],
})
export class ShezhiPage implements OnInit {
  user_info: any;
  wx_user_info: any;
  mobile: any;
    init:boolean;//标识是否是第一次加载
  constructor(
    public loginmodel: LoginModel,
    public localstorageModel: LocalStorageModel,
    public tools:ToolsModel,
    public toastCtrl: ToastController,
    public _router: Router,

    public JpushUtilModel: JpushUtilModel,

    // public alertController: AlertController,
    // public navParams: NavParams
  ) {
      this.init = true;
  }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.tools.decodeUrlList(res);
      if (login_info.error != '0') {
          this._router.navigateByUrl('/home');
          return;
      } else {
        this.user_info = login_info.body;
          this.mobile = this.user_info.mobile
          // console.log(this.user_info, 'user_info0000000000000000000000000000');
          this.loginmodel.getSessionWeixinUserInfo().subscribe(res => {
          let wx_info: any = this.tools.decodeUrlList(res);
            if ( wx_info.error != '0') {
                this.wx_user_info = '';
            } else {
                this.wx_user_info = wx_info.body;
            }
        })
      }
    }); // 登陆验证
  }
    // 离开页面的时候触发
    ionViewDidLeave() {
        this.init = true;
    }
  bangdingweixin(){
    Wechat.isInstalled(isInstalled => {
      let scope = "snsapi_userinfo",
          state = "_" + (+new Date());
          Wechat.auth(scope,state, res => {
            this.loginmodel.updateWeixinInfo(res.code).subscribe(date => {
              let dates: any = this.tools.decodeUrlList(date);
              if (dates.error != '0') {
                  this.toastTip(dates.body);
              } else {
                this.user_info = dates.body;
                this.toastTip('绑定成功');
              }
            });
        }, err => {
          this.toastTip('登录错误');
          alert(JSON.stringify(err));
        });
    }, err => {
         this.toastTip('请先安装微信客户端');
    })
  }
  // 警告提醒部分
  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle' // Type : 	"bottom" | "middle" | "top"
      });
    toast.present();
  }

  tuichuLogin() {
    this.JpushUtilModel.setAlias('');    // 设置别名
    this.loginmodel.clearSession().subscribe( res => {
        // console.log(res, 'res tuichu');
    });
      // console.log('tuichu');
    this._router.navigateByUrl('/home');   // 跳转
    // navigator[ 'app' ].exitApp();
  }
  //   tuichuLogin() {
  //       let alert = this.alertCtrl.create({
  //           title: '提示',
  //           subTitle: '你确定要退出账号吗？',
  //           buttons: [
  //               {
  //                   text: '取消',
  //                   role: 'cancel',
  //                   handler: () => {
  //                       this.menuCtrl.close();
  //                   }
  //               },
  //               {
  //                   text: '确定',
  //                   handler: () => {
  //                       this.menuCtrl.close();
  //                       this.storage.clear();
  //                       setTimeout(() => {
  //                           this.app.getRootNav().push(HomePage);
  //                       }, 500)
  //                   }
  //               }
  //           ]
  //       });
  //       alert.present();
  //   }
}
