import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';           // 跳转类库
import { ToastController, LoadingController , ModalController } from '@ionic/angular';   // 弹窗类库
// import { Wechat } from '@ionic-native/wechat/ngx';
import {HttpClient} from '@angular/common/http';
import { LoginModel, SessionStorageModel , ToolsModel, MapModel , JpushUtilModel } from '../model';              // 应用登录操作类
// import { Sim } from '@ionic-native/sim/ngx';
import { OnEnterPage } from '../model/on-enter-page';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
// import { JPushService } from '@jiguang-ionic/jpush/ngx';

import { AlertController } from '@ionic/angular';

import { MessageService } from '../service/message.service';
// import { XiaoxiPage } from "../xiaoxi/xiaoxi.page";
// import {AgreementPage} from '../agreement/agreement.page';
import { DefaultPage } from '../default/default.page';
import { RenwuPage } from '../renwu/renwu.page';
import {XiaoxiPage} from '../xiaoxi/xiaoxi.page';
import {PrivacyPage} from '../privacy/privacy.page';
import {NavController} from '@ionic/angular';
import {PermissionPage} from '../permission/permission.page';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
declare var Wechat: any;
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends OnEnterPage  {
    sjName: string;  // 接收手机账号
    yzmName: string;  // 接收手机验证码
    init: boolean; // 标识是否是第一次加载
    intervalId: any;
    Notice: any;
    init_login: any;
    is_first_login: any;
    once_login: any;
    once_login_push:any;
    constructor(   // 初始化用到的类库
        // public jPushPlugin: JPush,
        // public app: IonApp,
        public Navctrl: NavController,
        public modalCtrl: ModalController,
        public jpush: JPush ,
        public toastCtrl: ToastController,
        public router: Router,
        public loginmodel: LoginModel,
        public sessionstorageModel: SessionStorageModel,
        public toolsmodel: ToolsModel,
        public mapmodel: MapModel,
        private androidPermissions: AndroidPermissions,
        private  geolocation: Geolocation,
        public alertController: AlertController,
        // public accountLogin: LoginModel,
        // public sim:Sim,
        // private wechat: Wechat,
        public loadingCtrl: LoadingController,
        public JpushUtilModel: JpushUtilModel,
        private messageService: MessageService,
        private platform: Platform,
        private splashScreen: SplashScreen,
    ) {
        super(router);
        this.matchUrl = ['/home'];
        this.init = true;
        // this.loginmodel.LoginSession().subscribe(res => {
        //   console.log(res);
        //   let login_info:any = this.toolsmodel.decodeUrlList(res);
        /* this.jPushPlugin.openNotification()
             .subscribe( res => {
                 console.log(res);
                 console.log('收到点击通知事件');
             });

         this.jPushPlugin.receiveNotification()
             .subscribe( res => {
                 console.log(res);
                 console.log('收到通知');
             });

         this.jPushPlugin.receiveMessage()
             .subscribe( res => {
                 console.log(res);
                 console.log('收到自定义消息');
             });

         this.jPushPlugin.backgroundNotification()
             .subscribe( res => {
                 console.log(res);
                 console.log('收到后台通知');
             });*/
    }
    async ngOnInit () {   // 第一次加载执行

        super.ngOnInit();
        // this.platform.ready().then(() => {
        //     // alert('123')
        //     setTimeout(() => {
        //         this.splashScreen.hide();
        //     }, 1000);
        // });
        this.sjName = '' ;
        this.yzmName = '';
        // this.getSim();
        this.reload_page();
         if (window.localStorage.getItem('once_login') == null) {
            this.tip('欢迎使用斗金客户端，软件使用完全免费，在使用过程中会产生数据流量和流量费用请咨询当地运营商。在使用斗金的过程中，为了正常使用相关功能，将会使用您手机中的地理位置、相机功能，并涉及系统权限设置修改。我们郑重承诺:信息以加密方式传输，绝不会泄露你的个人信息。');
         } 

    }
    // 上面数组内链接跳转触发
    onEnter() {
        console.log('onEnter home');
        // this.reload_page();
    }

    async reload_page() {
        await this.loginmodel.LoginSessionT().then(res  => {
            let login_info:any = res;
            console.log( res, 'resres0000000000000000');
            if (login_info.error == '0') {
                // this.router.navigateByUrl('/default');   // 跳转
                // this.toastTip('进入home页reload')
            }
        })
        this.JpushUtilModel.setAlias('');
        // await super.showLoading(this.loadingCtrl, ' 登录加载中...');
        // await this.loginmodel.LoginSession().subscribe(res => {
        //       console.log(res,'resresres loginsession');
        //       let login_info:any = this.toolsmodel.decodeUrlList(res);
        //       if (login_info.error == '0') {
        //           this.router.navigateByUrl("/default");   // 跳转
        //       } else {
        //           this.mapmodel.gps_play_shouquan();
        //       }
        //   })
    }
    ionViewWillEnte() {
        // this.init = false;
        // this.reload_page();
    }
    // // 页面之间切换 出发
    ionViewDidEnter() {
        // this.onEnter()
        // this.mapmodel.gps_play_shouquan();
        // if (!this.init) {
        //     console.log('ionViewDidEnter home');
        //     this.reload_page();
        // }
    }
    // 离开页面的时候触发
    ionViewDidLeave() {
        this.sjName = '' ;
        this.yzmName = '';
        this.mobileCode = {  // 定义数组
            name: '获取验证码',
            time: 60,
            disable: true
        };
        this.init = false;
        this.init_login = false;
        this.mobileCode = {   // 定义数组
            name: '获取验证码',
            time: 60 ,
            disable: true
        };
        this.logoCode  = {   // 定义数组
            name: '登录',
            disable: true
        };
    }
   async tip(msg) {
        const alert = await this.alertController.create({
            header: '温馨提示',
            message: '<div class="info" style="text-align: left">欢迎使用斗金客户端，软件使用完全免费，在使用过程中会产生数据流量和流量费用请咨询当地运营商。<br>' +
                '在使用斗金的过程中，为了正常使用相关功能，将会使用您手机中的地理位置、相机功能，并涉及系统权限设置修改。<br>' +
                '我们郑重承诺:信息以加密方式传输,绝不会泄露您的个人信息。</div>',
            cssClass: 'gongsi',
            // inputs: [
            //     {
            //         name: 'name1',
            //         type: 'text',
            //         placeholder: '请输入公司名称！',
            //     }
            // ],
            buttons: [
                {
                    text: '退出',
                    role: 'cancel',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Confirm Cancel');
                        // this.modalCtrl.dismiss();
                        // this.JpushUtilModel.setAlias('');
                        navigator[ 'app' ].exitApp();
                        // this.platform.exitApp();
                    }
                }, {
                    text: '使用',
                    cssClass: 'sure',
                    handler: (value) => {
                    // this.JpushUtilModel.setAlias('login_info.body.id');
                    // this.sendMessage(this.Notice);
                    this.back();
                    this.mapmodel.gps_play_shouquan();
                    }
                }
            ]
        });
        await alert.present();
    }
    // async gongcheng_img_fangqi() {
    //     const alert = await this.alertController.create({
    //         header: '允许斗金给您推送消息吗?',
    //         cssClass: 'gongsi',
    //         // inputs: [
    //         //     {
    //         //         name: 'name1',
    //         //         type: 'text',
    //         //         placeholder: '请输入公司名称！',
    //         //     }
    //         // ],
    //         buttons: [
    //             {
    //                 text: '拒绝',
    //                 role: 'cancel',
    //                 cssClass: 'primary',
    //                 handler: () => {
    //                     console.log('Confirm Cancel');
    //                     // this.modalCtrl.dismiss();
    //                     this.JpushUtilModel.setAlias('');
    //                 }
    //             }, {
    //                 text: '允许',
    //                 cssClass: 'sure',
    //                 handler: (value) => {
    //                     // this.JpushUtilModel.setAlias('login_info.body.id');
    //                 // this.sendMessage(this.Notice);
    //                 }
    //             }
    //         ]
    //     });
    //     // return await
    //     // alert.present();
    //     await alert.present();
    //
    // }

    // sendMessage(Notice: string) {
    //     Notice = '1';
    //     this.messageService.messageAction(Notice);
    // }
    mobileCode: any = {   // 定义数组
        name:'获取验证码',
        time: 60 ,
        disable: true
    };

    // getSim(){
    //   this.sim.getSimInfo().then(
    //     (info) => console.log('Sim info: ', info),
    //     (err) => console.log('Unable to get sim info: ', err)
    //   );
    //   this.sim.hasReadPermission().then(
    //     (info) => console.log('Has permission: ', info)
    //   );
    //
    //   this.sim.requestReadPermission().then(
    //     () => console.log('Permission granted'),
    //     () => console.log('Permission denied')
    //   );
    //
    // }
    async presentLoadingWithOptions() {
        const loading = await this.loadingCtrl.create({
            spinner: null,
            duration: 5000,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }

    weChatAuth() {
        Wechat.isInstalled(isInstalled => {
            let scope = "snsapi_userinfo",
                state = "_" + (+new Date());
            Wechat.auth(scope,state,res => {
                this.loginmodel.getWechatInfo(res.code).subscribe(date=>{
                    let dates:any = this.toolsmodel.decodeUrlList(date);
                    if(dates.error != '0'){
                        this.toastTip(dates.body);
                        alert('123')
                    }else{
                        if(dates.body == ''){
                            this.router.navigateByUrl("/default");   //跳转
                        } else {
                            this.router.navigateByUrl("/bangdingshouji/"+dates.body);   //跳转
                        }
                    }
                });
            },err=>{
                alert('登录错误');
                alert(JSON.stringify(err));
            });
        }, err => {
            alert('请先安装微信客户端');
        })


    }
    // login1(){
    //     this.router.navigateByUrl("/default");   //跳转
    // }
    getYanzheng() {
        if (!this.sjName) {
            this.toastTip('请输入手机号码！')
            return;
        }
        // this.mapmodel.gps_play_shouquan();
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.sjName)) {
            alert('请输入正确的手机号!');
            return;
        } else {
            // this.setTime();
            let getYzm_info = {
                sjName: this.sjName
            }
            this.loginmodel.getYzm(getYzm_info).subscribe(res => {
                res = this.toolsmodel.decodeUrlList(res);
                console.log(res, 'res1111111111111111');
                if ( res.error != '0' ) {
                    alert(res.body)
                    this.toastTip(res.body);
                    return;
                } else {
                    this.mobileCode.disable = false;
                    this.setTime();
                    return;
                }
            });
        }
    }
    setTime() {
        if (this.mobileCode.time == 0) {
            this.mobileCode.time = 60;
            this.mobileCode.name = '获取验证码';
            this.mobileCode.disable = true;
            return;
        } else {
            this.mobileCode.time -- ;
        }
        this.intervalId = setTimeout( () => {     // 定时器
            this.mobileCode.name = this.mobileCode.time + '秒后重新获取';
            this.setTime();
            console.log('11111111');
        }, 1000);
    }

    // 登录部分
    logoCode: any = {   // 定义数组
        name: '登录',
        disable: true
    }

    login() {
        window.localStorage.setItem('once_login',this.yzmName);
        
        if (!this.sjName) {
            this.toastTip('请输入手机号码！')
            return;
        }
        if (!this.yzmName) {
            this.toastTip('请输入手机验证码！')
            return;
        }
        this.logoCode.name = '登录中..';
        this.logoCode.disable = false;
        let post_user_info = {
            sjName: this.sjName,
            yzmName: this.yzmName
        };
        console.log('yanzheng');
        console.log('2222222');
        // alert('yanzheng')
        var that = this;
        that.loginmodel.accountLogin(post_user_info).subscribe(res => {
            // alert(res)
            res = that.toolsmodel.decodeUrlList(res);
            console.log(res, 'resdengluuuuuuuuuuuu');
            if (res.error !== '0' ) {
                that.toastTip(res.body);
                that.logoCode.name = '登录';
                that.logoCode.disable = true;
                return;
            } else {
                clearTimeout(that.intervalId);
                that.intervalId = null;
                that.logoCode.name = '登录中..';
                that.logoCode.disable = true;
                // this.router.navigateByUrl('/default'); // 跳转
                // this.router.navigate(['default'])
                this.Navctrl.navigateRoot(['default']);
                // this.router.navigateByUrl('/default/renwu'); // 跳转

                // this.back()
                // this.open_xiaoxi()
                that.logoCode.disable = true;
                return;
               
                // 更新session中经纬度
                let gps_x_y:any = this.mapmodel.gps_x_y();
                gps_x_y = gps_x_y.then((result) => {
                    console.log(result, 'resultresultresultresult');
                    let sessioncon = {
                        gpsy: result.longitude,
                        gpsx: result.latitude
                    }
                    console.log(sessioncon, '123');
                    this.loginmodel.updateSessionInfo(sessioncon).subscribe(   res => {
                        console.log(res, '090909090909090909090');
                    });
                })
                gps_x_y = gps_x_y.catch(  function (reason) {
                });
            }
        });
    }
    back() {
        this.modalCtrl.dismiss();
    }
    async open_xiaoxi() {
        const modal = await this.modalCtrl.create({component: PrivacyPage });
        modal.onDidDismiss().then( res => {
            this.router.onSameUrlNavigation = 'reload';
         // alert('回到首页');
        });
        await modal.present();
    }
   async open_permission() {
        const modal = await this.modalCtrl.create({component: PermissionPage });
        modal.onDidDismiss().then( res => {
            this.router.onSameUrlNavigation = 'reload';
            // alert('回到首页');
        });
        await modal.present();
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

}
