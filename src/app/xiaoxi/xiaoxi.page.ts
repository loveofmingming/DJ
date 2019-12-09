import {Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MapModel, MyTasksModel,  ToolsModel, LocalStorageModel, LoginModel, MyXiaoxisModel, JpushUtilModel} from '../model';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import {ModalController} from '@ionic/angular';
import { RenwuShenhezhongPage } from '../renwu-shenhezhong/renwu-shenhezhong.page';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
import { RenwuUpdateTishiPage } from '../renwu-update-tishi/renwu-update-tishi.page';
import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';
import { RenwuTongguoPage } from '../renwu-tongguo/renwu-tongguo.page';

import {RenwuTongguooPage} from '../renwu-tongguoo/renwu-tongguoo.page';
import {RenwuGuoqiPage} from '../renwu-guoqi/renwu-guoqi.page';

declare var BMap;
@Component({
  selector: 'app-xiaoxi',
  templateUrl: './xiaoxi.page.html',
  styleUrls: ['./xiaoxi.page.scss'],
})
export class XiaoxiPage implements OnInit {

    id: string;
    myxiaoxiList: any;
    messageslist: any[] = [];
    num: number;
    GoPage: any;
    isreads: any;

    read_msg: string;
    constructor(
                public mytaskmodel: MyTasksModel,
                public router: Router,
                public route: ActivatedRoute,
                public toolsmodel: ToolsModel,
                public httpClient: HttpClient,
                public localstorageModel: LocalStorageModel,
                public loginmodel: LoginModel,
                public myxiaoximodel: MyXiaoxisModel,
                private modalCtrl: ModalController
                ) {
        // this.isreads = '0';
        this.read_msg = 'read';

    }

  ngOnInit() {
      this.getMyXiaoxiList();
    // this.loginmodel.LoginSession().subscribe(res => {
    //   let login_info:any = this.toolsmodel.decodeUrlList(res);
    //   if (login_info.error != '0') {
    //       this.router.navigateByUrl('/home');
    //       return;
    //   } else {
    //     this.getMyXiaoxiList();
    //       // this.reload_page();
    //   }
    // });
    // // 登陆验证
    //     this.loginmodel.LoginSession(); // 登陆验证
    //     var uid = this.localstorageModel.getStore('userId');
        // this.getMyXiaoxiList();
  }
    // async reload_page() {
    //     await this.mytaskmodel.getAllOfMyTasks().then(res=>{
    //         let ress: any = res;
    //         if ( ress.error == '0') {
    //             this.mytasksList = ress.body;
    //             // this.myxiaoxiList = ress.body;
    //             console.log(ress.body);
    //             let doing = [];
    //             let doingnum = 0;
    //             let finishnum = 0;
    //             let finish = [];
    //             let that = this;
    //             this.myxiaoxiList.forEach((value, i) => {
    //                 if (value.action == 1) {
    //                     value.zhuangtai = '做任务';
    //                     value.link = '/renwu-zuorenwu';
    //                     const currentTime = new Date().getTime();
    //                     const expiredTime = new Date(value.time_expired).getTime()
    //                     const timelong = Math.floor((expiredTime - currentTime) / 3600000)
    //                     const timeup = Math.ceil((expiredTime - currentTime) / 3600000); // 向上取小时整数
    //                     const timedown = Math.floor((expiredTime - currentTime) / 3600000); // 向下取小时整数
    //
    //                     const timedifer = expiredTime - currentTime;  //时间差
    //                     const minutelong = Math.round((timedifer - timedown * 3600000) / 60000)
    //
    //                     if (timelong > 0) {
    //                         value.timelong = '(剩' + timelong + '小时' + minutelong + '分钟)';
    //                     } else if (timelong <= 0) {
    //                         value.timelong = '';
    //                     }
    //                     doingnum++;
    //                     doing.push(value);
    //                 } else if (value.action == 2) {
    //                     value.link = '/renwu-shenhezhong';
    //                     value.zhuangtai = '审核中';
    //                     doingnum++;
    //                     doing.push(value);
    //                 } else if (value.action == 3) {
    //                     value.zhuangtai = '去修改';
    //                     value.link = '/renwu-update-tishi';
    //                     doingnum++;
    //                     doing.push(value);
    //                 } else if (value.action == 9 ) {
    //                     value.zhuangtai = '领取奖励';
    //                     value.link = '/renwu-tongguoo';
    //                     finishnum++;
    //                     doing.push(value);
    //                 } else if (value.action == 11 ) {
    //                     value.zhuangtai = '已获奖励';
    //                     value.link = '/renwu-wancheng';
    //                     finishnum++;
    //                     doing.push(value);
    //                 } else if (value.action == 10) {
    //                     value.zhuangtai = '审核未通过已过期';
    //                     finishnum++;
    //                     doing.push(value);
    //                 }
    //
    //             });
    //             this.myxiaoxiList = doing;
    //             // this.doingList = doing;
    //             this.doingnum = doingnum;
    //             this.finishList = finish;
    //             this.finishnum = finishnum;
    //             this.num = finishnum + doingnum;
    //
    //         } else {
    //             this.num = 0;
    //             this.myxiaoxiList = ress.body;
    //         }
    //     });
    //     await this.loadingCtrl.dismiss();
    // }

  getMyXiaoxiList() {
      this.myxiaoximodel.getAllOfMyXiaoxis().subscribe(res => {
        let ress:any = this.toolsmodel.decodeUrlList(res);
          console.log(ress, 'resssssssssssssssssssssssssssss');
          if (ress.error == '0') {
          this.myxiaoxiList = ress.body;
          console.log(this.myxiaoxiList, 'this.myxiaoxiList');
          let doing = [];
          this.myxiaoxiList.forEach((value, index) => {
            if (value.action == 1) {
                value.link = '/renwu-zuorenwu';
                doing.push(value);
            } else if (value.action == 2) {
                value.link = '/renwu-shenhezhong';
                doing.push(value);
            } else if (value.action == 3) {
                value.link = '/renwu-update-tishi';
                doing.push(value);
            } else if (value.action == 4) {
                value.zhuangtai = '审核未通过';
                value.link = '/renwu-tongguoo';
                doing.push(value);
            } else if (value.action == 9 ) {
                value.link = '/renwu-tongguo';
                doing.push(value);
            } else if (value.action == 11 ) {
                value.link = '/renwu-wancheng';
                doing.push(value);
            } else if (value.action == 10) {
                doing.push(value);
                value.link = '/renwu-guoqi';
            }
        });
          this.myxiaoxiList = doing;
          console.log(this.myxiaoxiList, 'this.-doinggggggggggggggggggggggggg');
        } else {
          this.myxiaoxiList = ress.body;
          console.log(this.myxiaoxiList, 'ddddddddddddddddddddddddd');
          }
    });
  }
  back() {
    this.modalCtrl.dismiss();
    // this.router.navigateByUrl('default/renwu/pickables');
  }
  async open_renwu_jxz(link, id, task_id , isreads, messageid, read_msg) {
    switch (link) {
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
        case '/renwu-wancheng':
        this.GoPage = RenwuWanchengPage;
        break;
        case '/renwu-tongguo':
        this.GoPage = RenwuTongguoPage;
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
                'tid': task_id,
            }
        }
    );
      if ( isreads !== '1' ) {
          let con = {
              messageid: messageid,
          };
          this.myxiaoximodel.updateMyXiaoXi(con).subscribe(res => {
          });
      }
    modal.onDidDismiss().then( res => {
          // this.reload_page();
          this.getMyXiaoxiList();
      });
    // this.read_msg = 'readed';
    await  modal.present();
      // 记录此消息已读

  }

  async open_renwu_wc(link, id, task_id, isreads, messageid) {

    switch (link) {
        case '/renwu-wancheng':
        this.GoPage = RenwuWanchengPage;
        break;
        case '/renwu-tongguoo':
        this.GoPage = RenwuTongguoPage;
        break;
        case '/renwu-shenhezhong':
        this.GoPage = RenwuShenhezhongPage;
        break;
    }
    const modal = await this.modalCtrl.create(
        {
            component: this.GoPage,
            componentProps: {
                'id': id,
                'tid': task_id,
                'isreads': isreads,
            }
        }
    );
      // modal.onDidDismiss().then( res => {
      //     // this.reload_page();
      //     this.getMyXiaoxiList();
      // });
    await  modal.present();
    // 记录此消息已读
    if ( isreads == '0' ) {
      let con = {
        messageid: messageid,
      };
      this.myxiaoximodel.updateMyXiaoXi(con).subscribe(res => {
      });
    }
  }




}
