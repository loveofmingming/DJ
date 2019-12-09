/**
 *消息推送处理
 *参考来源：https://github.com/jpush/jpush-phonegap-plugin
 * @ght
 */
import { Injectable } from '@angular/core';
import {RenwuPage} from '../renwu/renwu.page'; //  引入父页面
import {MyXiaoxisModel} from '../model';
import { MessageService } from '../service/message.service';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { Router} from '@angular/router';
import { ToolsModel } from './tools.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {XiaoxiPage} from '../xiaoxi/xiaoxi.page';
import {RenwuWanchengPage} from '../renwu-wancheng/renwu-wancheng.page';
import {RenwuTongguoPage} from '../renwu-tongguo/renwu-tongguo.page';
import {RenwuShenhezhongPage} from '../renwu-shenhezhong/renwu-shenhezhong.page';
import {RenwuTongguooPage} from '../renwu-tongguoo/renwu-tongguoo.page';
import {RenwuGuoqiPage} from '../renwu-guoqi/renwu-guoqi.page';
import {RenwuZuorenwuPage} from '../renwu-zuorenwu/renwu-zuorenwu.page';
import {RenwuUpdateTishiPage} from '../renwu-update-tishi/renwu-update-tishi.page';

import { Component} from '@angular/core';
// import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class JpushUtilModel {
    Number: number = 0;
    private registrationId: string;
    sequence: number = 0;
    GoPage: any;
    xiaoxi_count: any;
    count: any;
    constructor(
        public myxiaoximodel: MyXiaoxisModel,
        private messageService: MessageService,
        private jpush: JPush,
        public router: Router,
        //..
        public tools: ToolsModel,

        public http: HttpClient,

        public modalCtrl: ModalController,
    ) {
      this.count = true;
    }
    // get_weidu_xiaoxi() {
    //     console.log('dingshiqi');
    //     this.myxiaoximodel.getWeiDuXiaoXiCount().subscribe(res => {
    //         let ress:any = this.tools.decodeUrlList(res);
    //         console.log(ress, 'xiaoxi count');
    //         if (ress.error == '0') {
    //             this.xiaoxi_count = ress.body;
    //             const count: string = this.xiaoxi_count
    //             this.messageService.messageAction(count);
    //             // this.cdr.markForCheck();
    //             // this.cdr.detectChanges();
    //         } else {
    //             this.xiaoxi_count = '';
    //         }
    //     });
    // }
    initPush() {
        setTimeout(() => {     // 定时器
            this.getRegistrationID();
        }, 1000 );
        this.jpush.getUserNotificationSettings().then(result => {
            if (result == 0) {
                console.log('jpush-系统设置中已关闭应用推送');
            } else if (result > 0) {
                console.log('jpush-系统设置中打开了应用推送');
            }
        });
        //
        this.jpush.isPushStopped().then(result => {
            if (result == 0) {
                console.log('jpush-系统设置中已0应用推送');
            } else if (result > 0) {
                console.log('jpush-系统设置中' + result + '应用推送');
            }
        });
        // // 收到通知时会触发该事件 下面有
        // document.addEventListener('jpush.receiveNotification', event => {
        //     const content = event['alert'];
        //     console.log('jpush.receiveNotification' + content);
        //     // this.get_weidu_xiaoxi();
        //     this.messageService.messageAction(this.count);
        //     // alert(event)
        //     alert( 'event:' + JSON.stringify(this.count));
        //     // alert('123');
        //     // 收到通知时，小手机有问题，但是直接alert弹屏了->有效
        // }, false);
        // // 收到自定义消息时触发这个事件
        document.addEventListener('jpush.receiveMessage', event => {
            const message =   event[ 'message'];
            console.log('jpush.receiveMessage' + message);
            // let con = {
            //     mtid: event.extras.mtid,
            //     messageid: event.extras.messageid,
            // };
            // // ..
            // this.tools.postUrl('/push/Push/receiveMessage',con).subscribe(res => {
            //
            // });
        }, false);
        this.jieshou();
        this.dakaipush();
        this.jieshoubendi();
        // this.pushpage();
    }
    jieshou() {
        /*接收消息触发 */
        document.addEventListener('jpush.receiveNotification', (event: any) => {
            // alert('jieshou')
            this.messageService.messageAction(this.count);
            // console.log(event);
            let con = {
                mtid: event.extras.mtid,
                messageid: event.extras.messageid,
            };
            // ..
            this.tools.postUrl('/push/Push/receiveNotificationLog', con).subscribe(res => {

            });

        }, false);
    }
    // pushpage() {
    //     document.addEventListener('jpush.appintent', (ret: any) => {        //     const ajpush = ret.appParam.ajpush;
    //         const ajpush = ret.appParam.ajpush;
    //         // alert(JSON.stringify(ajpush))
    //         const extra = ajpush.extra;
    //         // alert(JSON.stringify(extra))
    //         // const ext = eval('(' + extra + ')');
    //         // OpenPage(ext.pageID);
    //     });
    //
    // }
    dakaipush() {
        /*打开消息触发 */
        document.addEventListener('jpush.openNotification', (event: any) => {
            // alert('打开消息')
            // alert( 'event:' + JSON.stringify(event));
            // alert( 'event.extras:' + JSON.stringify(event.extras));
            let con = {
                mtid: event.extras.mytaskid,
                // task_id: event.extras.taskid,
                messageid: event.extras.messageid
            };
            // ..
            // 记录打开信息
            this.tools.postUrl('/push/Push/openNotificationLog', con).subscribe(res => {
                // alert( 'res:' + JSON.stringify(res));
            });
            // 记录打开信息
            let mytaskcon = {
                mtid: event.extras.mytaskid
            };
            var mtid = event.extras.mytaskid;
            // var task_id = event.extras.taskid;
            // 根据my_task_id去my_tasks表中获取task_id,组合详情页。
            // this.router.navigate(['xiaoxi']);
            // alert( 'mytaskcon:' + JSON.stringify(mytaskcon));
            // this.router.navigateByUrl('./xiaoxi');

            // this.tools.postUrl('/tasks/Tasks/getTasksIdByMyTaskId', mytaskcon).subscribe(res => {
            //     alert( 'res:' + JSON.stringify(res));
            //     let ress: any = this.tools.decodeUrlList(res);
            //     alert( 'ress:' + JSON.stringify(ress));
            //     if(ress.error =='0') {
            //         let taskid = ress.body.task_id;
            //         let action = ress.body.action;
            //         alert(taskid)
            //         alert(action)
            //         let link = '';
            //         if (action == 1) {
            //             link = '/renwu-zuorenwu';
            //         } else if (action == 2) {
            //             link = '/renwu-shenhezhong';
            //         } else if (action == 3) {
            //             // value.zhuangtai = '去修改';
            //             link = '/renwu-update-tishi';
            //         } else if (action == 4) {
            //             // value.zhuangtai = '去修改';
            //             link = '/renwu-tongguoo';
            //         } else if (action == 9 ) {
            //             // value.zhuangtai = '领取奖励';
            //             link = '/renwu-tongguo';
            //         } else if (action == 11 ) {
            //             // value.zhuangtai = '已获奖励';
            //             link = '/renwu-wancheng';
            //         } else if (action == 10) {
            //             // value.zhuangtai = '审核未通过已过期';
            //             link = '/renwu-guoqi';
            //         }
            //         this.router.navigateByUrl(link + ',' + mtid + ',' + taskid );
            //         this.router.navigateByUrl(link);
            //         // [link],{queryParams:{'mtid':mtid,'tid':taskid}}
            //         if (link != '') {
            //             this.router.navigateByUrl(link + ',' + mtid + ',' + taskid );
            //             alert(link + ',' + mtid + ',' + taskid)
            //             // this.router.navigateByUrl(link );
            //         } else {
            //             this.router.navigateByUrl(link);
            //         }
            //         alert(link)
            //         alert(mtid)
            //         alert(taskid)
            //         // this.open_renwu_wc(link, mtid , taskid);
            //         // this.open();
            //         this.router.navigateByUrl('/xiaoxi');
            //     }
            // });

        }, false);
    };
    async open_renwu_wc(link, mtid , taskid) {
        // alert(link)
        // alert(mtid)
        // alert(taskid)
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
            case '/renwu-zuorenwu':
                this.GoPage = RenwuZuorenwuPage;
                break;
            case '/renwu-update-tishi':
                this.GoPage = RenwuUpdateTishiPage;
                break;
        }
        const modal = await this.modalCtrl.create(
            {
                component: this.GoPage,
                componentProps: {
                    'id': mtid,
                    'tid': taskid
                }
            }
        );
        modal.onDidDismiss().then( res => {
            // this.reload_page();
        });
        await  modal.present();
    }

    async open() {
        // alert('openeddddd')
        const modal = await this.modalCtrl.create({component: XiaoxiPage });
        modal.onDidDismiss().then( res => {
            // this.get_weidu_xiaoxi();
            // this.router.onSameUrlNavigation = 'reload';
            // let selTab = this.tabRef.getSelected();
            // this.router.navigateByUrl('/default/renwu/' + selTab );
        });
        await  modal.present();
    }

    jieshoubendi() {
        /** 接收本地消息 */
        document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
            console.log('接收本地消息');
            console.log(event);
            // this.router.navigate(['/shezhi']);
            // this.logger.log(event,'receive local notification');
        }, false);
    };
    tagResultHandler = function(result) {
        var sequence: number = result.sequence;
        var tags: Array<string> = result.tags == null ? [] : result.tags;
        // this.logger.log('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString(),'标签设置回调');
    };
    aliasResultHandler = function(result) {
        var sequence: number = result.sequence;
        var alias: string = result.alias;
        // this.logger.log('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias,'别名设置回调');
    };
    errorHandler = function(err) {
        var sequence: number = err.sequence;
        var code = err.code;
        // console.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
        // this.logger.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
    };
    /**
     * 设备的id
     */
    getRegistrationID() {
        console.log('获取getRegistrationID' );
        this.jpush.getRegistrationID()
            .then(rId => {
                console.log('getRegistrationID:' +  rId );
                if ( rId == '')  {
                    setTimeout(() => {     // 定时器
                        this.getRegistrationID();
                    },1000 );
                } else {
                    this.registrationId = rId;
                    // alert( this.registrationId);
                }
            }).catch((err) => {
            console.log('推送' + err);
        });
    }

    /**
     * 设置标签
     * tags:['Tag1', 'Tag2']
     */
    setTags(tags: Array<string>) {
        this.jpush.setTags({ sequence: this.sequence++, tags: tags})
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }
    /**
     * 添加标签
     * tags:['Tag3', 'Tag4']
     */
    addTags(tags: Array<string>) {
        this.jpush.addTags({ sequence: this.sequence++, tags: tags})
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }
    /**
     * 检测标签状态
     * * @param tag
     */
    checkTagBindState(tag: string) {
        this.jpush.checkTagBindState({ sequence: this.sequence++, tag: tag})
            .then(result => {
                var sequence = result.sequence;
                var tag = result.tag;
                var isBind = result.isBind;
                //   this.logger.log('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind,'标签状态')
            }).catch(this.errorHandler);
    }
    /**
     *
     * @param tag 删除标签
     */
    deleteTags(tag: Array<string>) {
        this.jpush.deleteTags({ sequence: this.sequence++, tags: tag})
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }
    /**
     *
     * 获取所有标签
     */
    getAllTags() {
        this.jpush.getAllTags({ sequence: this.sequence++ })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }
    /**
     *
     *清空所有标签
     */
    cleanTags() {
        this.jpush.cleanTags({ sequence: this.sequence++ })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }
    /**
     *
     * @param alias 设置别名
     */
    setAlias(alias: string) {
        console.log('jpush-开始设置别名:');
        this.jpush.setAlias({ sequence: this.sequence ? this.sequence++ : 1 , alias: alias })
            .then(result => {
                // alert('jpush-设置别名成功:');
                // console.log(result);
            })
            .catch(this.errorHandler);
    }
    /**
     *
     *
     * 获取所有别名
     */
    getAlias() {
        this.jpush.getAlias({ sequence: this.sequence++ })
            .then(this.aliasResultHandler)
            .catch(this.errorHandler);
    }
    /**
     *
     * 删除所有别名
     */
    deleteAlias() {
        this.jpush.deleteAlias({ sequence: this.sequence++ })
            .then(this.aliasResultHandler)
            .catch(this.errorHandler);
    }
    /**
     * 添加本地消息
     */
    addLocalNotification() {
        //   if (this.nativeService.isAndroid()) {
        //     this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
        //   } else {
        //     this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
        //   }
    }

}
