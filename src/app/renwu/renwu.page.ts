
import { Component, OnInit, ViewChild , ChangeDetectorRef } from '@angular/core';
import {ModalController, IonTabBar, IonTabs, NavController, LoadingController, AlertController, ToastController} from '@ionic/angular';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
// import { Geolocation } from "@ionic-native/geolocation";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToolsModel, LocalStorageModel, MapModel, MyXiaoxisModel, MyTasksModel, LoginModel, TasksModel , JpushUtilModel } from '../model';
import {XiaoxiPage} from '../xiaoxi/xiaoxi.page';
import {PositionPage} from '../position/position.page';
import { Router } from '@angular/router';

import { MessageService } from '../service/message.service';
import {Md5} from "ts-md5";
import {HomePage} from "../home/home.page";


declare var BMap;
@Component({
    selector: 'app-renwu',
    templateUrl: './renwu.page.html',
    styleUrls: ['./renwu.page.scss'],
})
export class RenwuPage {
    msg: any;
    city: any;
    gps_city: any;
    gps_x: any;
    gps_y: any;
    gps_time: any;
    xiaoxi_count: any;
    wode_renwu_count: any;
    leave: any;
    renwupages: any;
    static: boolean;
    myInterval: any;
    Notice: any;
    count: any;
    is_refresh: any;
    init_login: any;
    is_first_login: any;
    once_login_push:any;
    @ViewChild('renwupages', { static: true }) tabRef: IonTabs;
    constructor(
        // public myInterval: any, // 定时器
        public toastController: ToastController,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef,
        public router: Router,
        public modalCtrl: ModalController,
        public localstorage: LocalStorageModel,
        public mapmodel: MapModel,
        public taskmodel: TasksModel,
        public toolsmodel: ToolsModel,
        public loginmodel: LoginModel,
        public mytasksmodel: MyTasksModel,
        public myxiaoximodel: MyXiaoxisModel,
        private geolocation: Geolocation,
        private androidPermissions: AndroidPermissions,
        public navUrl: NavController,
        public JpushUtilModel: JpushUtilModel,
        public alertController: AlertController,
    ) {
        // this.count = true
        this.gps_city = '';
        setInterval(() => {
            // this.get_weidu_xiaoxi();
            this.messageService.message$.subscribe(count => this.count = count);
            console.log(this.count, 'this.count.this.count000');
            if (this.count) {
                // alert('count');
                this.get_weidu_xiaoxi();
                return;
            }
        }, 5000);
    }
    ngOnInit() {
        console.log('chushihua');
        // this.open_home();
        console.log(window.localStorage.getItem('is_first_login'),'2222222222222222222222222222222222222222222')
        this.loginmodel.LoginSession().subscribe(res => {
            let login_info: any = this.toolsmodel.decodeUrlList(res);
            console.log(res, 'resresrse111111111111122222222222');
            if (login_info.error != '0') {
                this.router.navigateByUrl('/home');
                // this.presentToast('到了任务页');
                return;
            } else {
                // this.gps_city = login_info.body.gps_city;
                this.gps_time = login_info.body.gps_time;
                console.log(this.gps_time, '登录信息里的gps_time');
                console.log(login_info, 'login_infologin_infologin_infologin_info');
                this.get_city_gps('pickables');
                this.get_weidu_xiaoxi();
                console.log('11111100000000000000000000000000');
                // this.get_wode_renwu();
                this.JpushUtilModel.setAlias('');
                console.log(window.localStorage.getItem('once_login_push'),'55555555555555555555555555555555555555')
                if (window.localStorage.getItem('once_login_push') == null) {
                    this.allowd_message(login_info.body.id);
                 }
                 window.localStorage.setItem('once_login_push',login_info.body.mobile);
            }
        }); // 登陆验证
    }
    ionViewDidEnter(): void {
        console.log('进入首页面');
    }
    async presentToast(msg:any) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'middle',
        });
        toast.present();
    }
    ionViewDidLeave() {
        // clearInterval(this.myInterval);
        this.init_login = false;
    }
    ionViewDidload() {
    }
    async allowd_message(i:any) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: '允许"斗金"在使用期间给您发送通知吗？',
            cssClass: 'gongsi',
            buttons: [
                {
                    text: '不允许',
                    role: 'cancel',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Confirm Cancel');
                        this.JpushUtilModel.setAlias('');
                    }
                }, {
                    text: '允许',
                    cssClass: 'sure',
                    handler: () => {
                        // this.JpushUtilModel.setAlias(i);
                        // console.log(i,'iiiiiiiiiiiiiiiii');
                        // this.JpushUtilModel.setAlias(Md5.hashStr('*&#$=zb147' + i).toString());
                        if (this.toolsmodel.isAndroids()) {
                            this.JpushUtilModel.setAlias(i);
                            console.log(i, 'iiiiiiiiiiiiiiiii');
                        }
                    }
                }
            ]
        });
        // return await
        // alert.present();
        await alert.present();
    }
    get_weidu_xiaoxi() {
        this.count = false;
        console.log('dingshiqi');
        this.myxiaoximodel.getWeiDuXiaoXiCount().subscribe(res => {
            let ress: any = this.toolsmodel.decodeUrlList(res);
            console.log(ress, 'xiaoxi count');
            if (ress.error == '0') {
                this.xiaoxi_count = ress.body;
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            } else {
                this.xiaoxi_count = '';
            }
        });
    }
    get_wode_renwu() {
        this.mytasksmodel.getWoDeTaskCount().subscribe(res => {
            let ress: any = this.toolsmodel.decodeUrlList(res);
            console.log(ress, 'ress00000000000000000000');
            if (ress.error == '0') {
                // console.log(ress, 'renwu ress00000000000000000000');
                this.wode_renwu_count = ress.body;
            } else {
                this.wode_renwu_count = '0';
            }
        });
    }
    get_city_gps(type:any) {   // 登录信息里的gps_time 已经在登录时的时间上加了半小时
        this.get_wode_renwu();
        // console.log('123');
        // this.get_city_gp_c();
        // let today_time = this.toolsmodel.getTodayTime();
        // console.log(today_time, 'today_timetoday_timetoday_timetoday_time');
        // let gps_time1 = this.localstorage.getStore('gps_time'); // 上次获取地理位置加上半个小时
        // console.log(gps_time1, '缓存中获取的gps time');
        const today_time_num = new Date().getTime();
        console.log(today_time_num, '当前时间');
        // getTodayTimeAddHours
        // let gps_time = this.mapmodel.getTodayTimeAddHours(0.5);
        // console.log(gps_time, '当前时间+半小时' );
        // 超过半小时 或者地址栏地址为空 刷新
        if ((today_time_num < this.gps_time) && this.gps_city != '') {
            console.log('000');
        } else {
            console.log('111');
            this.get_city_gp_c();
        }
    }
    get_city_bd_t() {
        const geolocation = new BMap.Geolocation();
        console.log('resp', 'renwu          resp7777777777');
        // alert('resp')
        geolocation.getCurrentPosition((resp) => {
            console.log(geolocation, 'geolocationgeolocationgeolocation');
            console.log(resp, 'renwu          resp888888');
            // console.log(resp.address.city,'renwu          resp.address.city');
            this.gps_city = resp.address.city;
            console.log(this.gps_city, '  ren wu        this.gps_citythis.gps_citythis.gps_citythis.gps_city');
            this.gps_x =  resp.latitude;
            this.gps_y = resp.longitude;
            // this.gps_x =  parseFloat( '115.5760853416');
            // this.gps_y = parseFloat( '38.8771368433');
            this.cdr.markForCheck();
            this.cdr.detectChanges();
            // this.sendMessage(this.gps_x)
            this.gps_time = this.mapmodel.getTodayTimeAddHours(0.5);
            console.log(this.gps_time, 'this.gps_timethis.gps_timethis.gps_time');
            this.updatesessioninfo();
        });
    }
// 获取经纬度
    get_city_gp_c() {
        // 39.962653,116.820007
        // 39.968381,116.832371
        // 38.8771368433,115.5760853416
       // this.get_city_bd_t();
       // this.get_wode_renwu();
       //  this.gps_city = '正在定位...';
       //  this.get_address_bybaidumap(38.968353 + 0.006000, 115.83230 + 0.010000, this);
        // alert('jinlaile');
       this.geolocation.getCurrentPosition().then((resp) => {
            // alert('1then');
        // console.log(resp.coords.latitude, resp.coords.longitude);
        this.gps_x = resp.coords.latitude;
        this.gps_y = resp.coords.longitude;
        this.get_address_bybaidumap(resp.coords.latitude + 0.006000, resp.coords.longitude + 0.010000, this );
        // this.updatesessioninfo();
        }).then(() => {
            // alert('2then');
            this.updatesessioninfo();
            this.is_refresh = true;
            this.messageService.messageAction(this.is_refresh); // index刷新
        }).catch((error) => {
            // alert('catch perssion ');
        this.gps_city = '定位失败';
        });
    }
    // a6685e9d9c4603089ba50b9cdaeff7fd
    // a6685e9d9c4603089ba50b9cdaeff7fd
    get_address_bybaidumap( x:any, y:any, that:any) {
        // let that = this;
        // 原始GPS坐标转为百度坐标
        const baiduPoint = new BMap.Point( y, x );
        const myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint,  function (result) {
            if ( result) {
                var test  = result.addressComponents.province + '-' + result.addressComponents.city + '-' + result.addressComponents.district +
                    '-' + result.addressComponents.street;
                that.gps_city = result.addressComponents.city;
                console.log(that.gps_city, 'that.gps_citythat.gps_city');
                if (that.gps_city == '') {
                    that.gps_city = '';
                    return;
                }
                that.gps_time = that.mapmodel.getTodayTimeAddHours(0.5);
                // console.log(this.gps_time, 'that.gps_time');
                // window.localStorage.setItem('gps_city', that.gps_city);
                // window.localStorage.setItem('gps_time', that.gps_time);
                // window.localStorage.setItem('gps_x', x );
                // window.localStorage.setItem('gps_y', y);
                // that.setCitySpace(that.gps_city)
            } else {
                // that.gps_city = '定位失败';
            }
        });
    }
    updatesessioninfo() {
        // 更新session
        let sessioncon = {
            gps_city: this.gps_city,
            gps_time: this.gps_time,
            gpsx: this.gps_x,
            gpsy: this.gps_y,
        };
        // console.log(this.gps_time, 'update');
        // console.log(this.gps_x, 'this.gps_x');
        // console.log(this.gps_y, 'this.gps_y');
        this.loginmodel.updateSessionInfo(sessioncon).subscribe(res => {
            if (res) {
            this.is_refresh = true;
            this.messageService.messageAction(this.is_refresh); // index刷新
            }
            
        });
    }
    async open_search() {
        const modal = await this.modalCtrl.create( { component: PositionPage });
        modal.onDidDismiss().then( res => {
            this.router.onSameUrlNavigation = 'reload';
            let selTab = this.tabRef.getSelected();
            this.router.navigateByUrl('/default/renwu/' + selTab );
        });
        await  modal.present();
    }
    async open_xiaoxi() {
        const modal = await this.modalCtrl.create({component: XiaoxiPage });
        modal.onDidDismiss().then( res => {
            this.get_weidu_xiaoxi();   // 跳转进消息页返回后
            this.router.onSameUrlNavigation = 'reload';
            let selTab = this.tabRef.getSelected();
            this.router.navigateByUrl('/default/renwu/' + selTab );
        });
        await  modal.present();
    }
}
