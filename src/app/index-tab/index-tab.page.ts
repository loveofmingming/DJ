import {Component, OnInit , ChangeDetectorRef , Input, EventEmitter, Output, Host, Inject, forwardRef } from '@angular/core';
import {RenwuPage} from '../renwu/renwu.page'; //  引入父页面
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MapModel, MyTasksModel, ToolsModel, LoginModel, LocalStorageModel } from '../model';
// import { Geolocation  } from '@ionic-native/geolocation/ngx';
import {ModalController, LoadingController } from '@ionic/angular';
import { RenwuShenhezhongPage } from '../renwu-shenhezhong/renwu-shenhezhong.page';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
import { RenwuUpdateTishiPage } from '../renwu-update-tishi/renwu-update-tishi.page';
import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';
import { RenwuTongguoPage } from '../renwu-tongguo/renwu-tongguo.page';
// import { RenwuTongguooPage } from '../renwu-tongguoo/renwu-tongguoo.page';
import { RenwuTongguooPage } from '../renwu-tongguoo/renwu-tongguoo.page'; // 未通过
import { RenwuGuoqiPage} from '../renwu-guoqi/renwu-guoqi.page';
import { OnEnterPage } from '../model/on-enter-page';
// declare var BMap;
@Component({
    selector: 'app-index-tab',
    templateUrl: './index-tab.page.html',
    styleUrls: ['./index-tab.page.scss'],
})
export class IndexTabPage extends OnEnterPage {
    a: any ;
    b: any ;
    c: any ;
    e: any ;
    t1: any ;
    index: any;
    GoPage: any;
    id: string;
    timelong: any;
    mytasksList: any;
    doingList: any;
    finishList: any[] = [];
    num: any;
    doingnum: number;
    finishnum: number;
    init: boolean; // 标识是否是第一次加载
    wode_renwu_count: any;
    constructor(
                @Host() @Inject(forwardRef(() => RenwuPage)) public app: RenwuPage,
                private cdr: ChangeDetectorRef,
                public router: Router,
                public route: ActivatedRoute,
                public mytaskmodel: MyTasksModel,
                public toolsmodel: ToolsModel,
                // public mapmodel: MapModel,
                public httpClient: HttpClient,
                // public geolocation: Geolocation,
                public loginmodel: LoginModel,
                public localstoragemodel: LocalStorageModel,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                ) {
        super(router);
        this.doingList = [];
        this.matchUrl = ['/default/renwu/mine'];
        // this.gps_city = '定位失败';
        this.init = true;
        this.doingnum = 0;
        this.finishnum = 0;
        this.num = 0;
    }

    async ngOnInit () {
        this.reload_page();
        console.log('index-tab ngOnInit');
    }

    onEnter() {
            // this.reload_page();
        console.log('index-tab onEnter');
    }
     // 第一次进来页面和重新加载的数据
    async reload_page() {

        // console.log(this.init,'tab this.init');
        // await super.showLoading(this.loadingCtrl, ' 加载中...');
        await this.loginmodel.LoginSessionT().then(res => {
            let login_info: any  = res;
            if (login_info.error != '0') {
                this.router.navigateByUrl('/home');
                return;
            }
        });

        await this.mytaskmodel.getAllOfMyTasks().then(res => {
            let ress: any = res;
            if ( ress.error == '0') {
                this.mytasksList = ress.body;
                console.log(this.mytasksList, 'this.mytasksListthis.mytasksList11111111111111111');
                let doing = [];
                let doingnum = 0;
                let finishnum = 0;
                let finish = [];
                let that = this;
                this.mytasksList.forEach((value, i) => {
                    if (value.action == 1) {
                        value.zhuangtai = '做任务';
                        value.link = '/renwu-zuorenwu';
                        const currentTime = new Date().getTime();
                        console.log(currentTime, 'currentTimecurrentTimecurrentTimecurrentTime');
                        // console.log(currentTime1111,'currentTimecurrentTimecurrentTimecurrentTime11111111111111');
                        const expiredTime = new Date(value.time_expired).getTime();
                        const timelong = Math.floor((expiredTime - currentTime) / 3600000);
                        const timeup = Math.ceil((expiredTime - currentTime) / 3600000); // 向上取小时整数
                        const timedown = Math.floor((expiredTime - currentTime) / 3600000); // 向下取小时整数
                        const timedifer = expiredTime - currentTime;  // 时间差
                        const minutelong = Math.round((timedifer - timedown * 3600000) / 60000);
                        if (timedifer > 0) {
                            value.timelong = '(剩' + timelong + '小时' + minutelong + '分钟)';
                        } else if (timedifer <= 0) {
                            value.timelong = '';
                        }
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 2) {
                        value.link = '/renwu-shenhezhong';
                        value.zhuangtai = '审核中';
                        const currentTime = new Date().getTime();
                        const expiredTime = new Date(value.time_expired).getTime();
                        const timelong = Math.floor((expiredTime - currentTime) / 3600000);

                        const timeup = Math.ceil((expiredTime - currentTime) / 3600000); // 向上取小时整数/
                        const timedown = Math.floor((expiredTime - currentTime) / 3600000); // 向下取小时整数
                        const timedifer = expiredTime - currentTime;  // 时间差
                        const minutelong = Math.round((timedifer - timedown * 3600000) / 60000);
                        if (timedifer > 0) {
                            value.timelong = '(剩' + timelong + '小时' + minutelong + '分钟)';
                        } else if (timedifer <= 0) {
                            value.timelong = '';
                        }
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 3) {
                        value.zhuangtai = '去修改';
                        value.link = '/renwu-update-tishi';
                        const currentTime = new Date().getTime();
                        const expiredTime = new Date(value.time_expired).getTime();
                        const timelong = Math.floor((expiredTime - currentTime) / 3600000);
                        const timeup = Math.ceil((expiredTime - currentTime) / 3600000); // 向上取小时整数
                        const timedown = Math.floor((expiredTime - currentTime) / 3600000); // 向下取小时整数
                        const timedifer = expiredTime - currentTime;  // 时间差
                        const minutelong = Math.round((timedifer - timedown * 3600000) / 60000);
                        if (timedifer > 0) {
                            value.timelong = '(剩' + timelong + '小时' + minutelong + '分钟)';
                        } else if (timedifer <= 0) {
                            value.timelong = '';
                        }
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 4) {
                        value.zhuangtai = '审核未通过';
                        value.link = '/renwu-tongguoo';
                        const currentTime = new Date().getTime();

                        const expiredTime = new Date(value.time_expired).getTime();
                        const timelong = Math.floor((expiredTime - currentTime) / 3600000);
                        const timeup = Math.ceil((expiredTime - currentTime) / 3600000); // 向上取小时整数
                        const timedown = Math.floor((expiredTime - currentTime) / 3600000); // 向下取小时整数
                        const timedifer = expiredTime - currentTime;  // 时间差
                        const minutelong = Math.round((timedifer - timedown * 3600000) / 60000);
                        if (timedifer > 0) {
                            value.timelong = '(剩' + timelong + '小时' + minutelong + '分钟)';
                        } else if (timedifer <= 0) {
                            value.timelong = '';
                    }
                        finishnum++;
                        finish.push(value);
                        // finishnum++;
                        // finish.push(value);
                    } else if (value.action == 9 ) {
                        value.zhuangtai = '领取奖励';
                        value.link = '/renwu-tongguo';
                        finishnum++;
                        finish.push(value);
                    } else if (value.action == 11 ) {
                        value.zhuangtai = '已获奖励';
                        value.link = '/renwu-wancheng';
                        finishnum++;
                        finish.push(value);
                    } else if (value.action == 10) {
                        value.zhuangtai = '项目已过期';
                        value.link = '/renwu-guoqi';
                        finishnum++;
                        finish.push(value);
                    }
                });
                this.doingList = doing;
                this.doingnum = doingnum;
                this.finishList = finish;
                this.finishnum = finishnum;
                this.num = finishnum + doingnum;
                console.log(this.doingList, 'this.doingListthis.doingList');
                console.log(this.finishList, 'finishlistllllll');
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            } else {
                this.num = 0;
            }
        });
        // await this.loadingCtrl.dismiss();
    }
    // 离开页面的时候触发
    ionViewDidLeave() {
        this.init = false;
    }
    // 页面之间切换 出发
    ionViewDidEnter() {
        if ( !this.init ) {
            this.reload_page();
            this.get_wode_renwu();
        }
    }
    totalNum() {
        let num = 0;
        this.doingList.forEach(item => {
            num += item.num;
        });
        return num;
    }
    tiaozhuan() {
        this.router.navigateByUrl('default/renwu/pickables');
    }
    async open_renwu_jxz( link, id , task_id ) {
     switch ( link ) {
        case '/renwu-shenhezhong':
        this.GoPage = RenwuShenhezhongPage;
        break;
        case '/renwu-zuorenwu':
        this.GoPage = RenwuZuorenwuPage;
        break;
        case '/renwu-update-tishi':
        this.GoPage = RenwuUpdateTishiPage;
        break;
        case '/renwu-tongguoo':
        this.GoPage = RenwuTongguooPage;
        break;
    }

    const modal = await this.modalCtrl.create(
        {
            component: this.GoPage,
            componentProps: {
                'id': id,
                'tid': task_id
            }
        }
    );
    modal.onDidDismiss().then( res => {
        this.reload_page();
      });
    await  modal.present();
  }

  async open_renwu_wc(link, id , task_id) {

    switch (link) {
        case '/renwu-wancheng':
        this.GoPage = RenwuWanchengPage;
        break;
        case '/renwu-tongguo':
        this.GoPage = RenwuTongguoPage;
        break;
        case '/renwu-shenhezhong':
        this.GoPage = RenwuShenhezhongPage;
        break;
        case '/renwu-tongguoo':
        this.GoPage = RenwuTongguooPage;
        break;
        case '/renwu-guoqi':
        this.GoPage = RenwuGuoqiPage;
        break;
    }
    const modal = await this.modalCtrl.create(
        {
            component: this.GoPage,
            componentProps: {
                'id': id,
                'tid': task_id
            }
        }
    );
      modal.onDidDismiss().then( res => {
          this.reload_page();
          this.get_wode_renwu();

      });
    await  modal.present();
  }


    get_wode_renwu() {
        this.mytaskmodel.getWoDeTaskCount().subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            console.log(ress, 'ress00000000000000000000');
            if (ress.error == '0') {
                // console.log(ress, 'renwu ress00000000000000000000');
                this.wode_renwu_count = ress.body;
                this.app.wode_renwu_count =  this.wode_renwu_count; // 将任务总数传递给任务(父页面)，刷新总数
                // 参考https://www.cnblogs.com/huangenai/p/7246651.html 3子获得父实例
            } else {
                this.wode_renwu_count = '0';
            }
        });
    }
}
