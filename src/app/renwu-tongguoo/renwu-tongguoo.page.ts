// import { Component, OnInit ,ChangeDetectorRef,OnDestroy } from '@angular/core';
// import { TasksModel,ToolsModel,LoginModel,LocalStorageModel} from '../model';
// import { ConfigModel} from '../model/config.model';
// import { ToastController } from '@ionic/angular';   //弹窗类库
// import { ActivatedRoute, Router } from '@angular/router';
// import {ModalController,NavParams } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksModel,ToolsModel,CameraModel,LocalStorageModel,LoginModel} from '../model';
import { ConfigModel} from '../model/config.model';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
// import {ViewController} from 'ionic-angular';
import { OnEnterPage } from '../model/on-enter-page';

@Component({
  selector: 'app-renwu-tongguoo',
  templateUrl: './renwu-tongguoo.page.html',
  styleUrls: ['./renwu-tongguoo.page.scss'],
})
export class RenwuTongguooPage implements OnInit {
    mtid: string;
  // tid:string;
  // tasksListCon:any;
  // img_url:string;
  // tasksJiangLiCon:any;
  // lingquJiangliJieguo:any;
  // JlBig:string;
  // computeTime:any;
  // intervalId:any;
  // isShow: any;
  // showWord:any;

    id: string;
    tid: string;
    tasksListCon: any;
    lingquCon: any;
    renwu_con_color: any;
    mytaskitemList: any;
    renwu_con_status: number; // 控制选项卡
    renwu_submit_status: string; // 控制提交按钮
    serve_img_url: string;
    img_url: string;
    upList: any;
    upnum: number;
    GoPage: any;

    showBigImageState:boolean;
    big_img:string;
    big_img_ti:number;
    big_img_i:number;
    big_img_count:number;

  jiangli : any = {   //定义数组
    action:'',
    rmb_r_num:'',
    rmb_x_num:'',
    dhb_r_num:'',
    dhb_x_num:'',
    bonus_type:'',
    bonus:'',
    isshow:false,
    isshow_ok:false
  }


  constructor(
    // private cdr: ChangeDetectorRef,
    // public changeDetectorRef: ChangeDetectorRef,

    // public viewCtrl: ViewController,
    // public tasksmodel: TasksModel,
    // public toolsmodel: ToolsModel,
    // public LocalStorageModel: LocalStorageModel,
    // public route: ActivatedRoute,
    // public router: Router,
    // public loginmodel: LoginModel,
    // public toastcon: ToastController,
    // public modalCtrl: ModalController,
    public navParams: NavParams,

    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public tasks: TasksModel,
    public LocalStorageModel: LocalStorageModel,
    public toolsmodel: ToolsModel,
    public loginmodel: LoginModel,
    public camera: CameraModel,
    public alertcontroller: AlertController,
    ) {
    this.upList = [];

    this.mtid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');
    //
    // this.tasksListCon = [];
    // this.tasksJiangLiCon = [];
    // this.lingquJiangliJieguo = [];
    // this.showWord = '领取奖励';

      this.serve_img_url = ConfigModel.BASE_IMG_URL;
      this.img_url = ConfigModel.BASE_IMG_URL;
      // this.id = this.route.snapshot.paramMap.get('id');
      // this.tid =  this.route.snapshot.paramMap.get('tid');
      this.renwu_submit_status = this.route.snapshot.paramMap.get('status');
      this.tasksListCon = [];
      this.mytaskitemList = [];
      // console.log(this.renwu_submit_status);
      this.renwu_con_color = [];
      this.showBigImageState = false;
  }
  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info : any = this.toolsmodel.decodeUrlList(res);
      if (login_info.error != '0') {
        this.router.navigateByUrl('/home');
        return;
      } else {
        // this.getTasksCon(this.id,this.tid);
        this.getTasksCon(this.mtid, this.tid)
          // console.log('123');
          // this.getMyTaskitems(this.id);
          // console.log('456');
        this.renwu_con_status = 1;
        this.renwu_con_color.renwu_color = 'ffffff';
        this.renwu_con_color.renwu_bgcolor = 'ff6600';
        this.renwu_con_color.xize_color = 'ff6600';
        this.renwu_con_color.xize_bgcolor = 'ffffff';
      }
    }); // 登陆验证
  }
   /**
   * 获取任务详情
   * @param id
   */
  // getTasksCon( mtid, tid ) {
  //   let con = {
  //     mtid: mtid,
  //     tid: tid,
  //   };
  //   this.tasksmodel.getOneMytasksTongGuoCon(con).subscribe(res => {
  //     let ress:any = this.toolsmodel.decodeUrlList(res);
  //     if (ress.error == '0') {
  //         this.tasksListCon = ress.body;
  //         console.log(this.tasksListCon,'this.ssssssssssssssssssssssss');
  //     } else {
  //       this.router.navigate(['/index-tab']);
  //     }
  //   });
  // }
    getTasksCon( mtid , tid ) {
       // console.log('333');
       let con = {
            mtid: mtid,
            tid: tid,
        };
       this.tasks.getOneMytasksTongGuoCon(con).subscribe(res => {
            // console.log( '000');
            let ress: any = this.toolsmodel.decodeUrlList(res);
            if (ress.error == '0') {
                this.tasksListCon = ress.body;
                // console.log(this.tasksListCon, 'this.tasksListConthis.tasksListCon');
                let uping = [];
                let upinging = [];
                uping.push(this.tasksListCon.mytask)
                // let that = this;
                uping.forEach((value) => {
                    if (value.action == 4) {
                        value.link = '/renwu-zuorenwu';
                        upinging.push(value);
                    }
                })
                this.upList = upinging;
                // console.log(this.upList[0].link, 'this.upListthis.upList');
            } else {
                this.router.navigate(['/index-tab']);
            }
        });
    }
/*  lingQuJiangLi() {
  let  lingqu_con = {
        tid: this.tid,
        mtid: this.mtid
    }
    this.tasksmodel.getOneTaskJiangliById(lingqu_con).subscribe(res => {
      this.tasksJiangLiCon = res;
      console.log(this.tasksJiangLiCon,'12121212121212121212');
      if (this.tasksJiangLiCon.error == '0') {
        this.tasksJiangLiCon = this.toolsmodel.decodeUrlList(this.tasksJiangLiCon.body);
        this.jiangli.action = this.tasksJiangLiCon.action;
        this.jiangli.rmb_r_num = this.tasksJiangLiCon.rmb_r_num;
        this.jiangli.rmb_x_num = this.tasksJiangLiCon.rmb_x_num;
        this.jiangli.dhb_r_num = this.tasksJiangLiCon.dhb_r_num;
        this.jiangli.dhb_x_num = this.tasksJiangLiCon.dhb_x_num;
        if (this.tasksJiangLiCon.action == 9 ) {
          this.jiangli.isshow = true;
        } else {
          this.toastTip("无权限领取,请返回！");
        }
      } else {
          this.toastTip(this.tasksJiangLiCon.body);
      }
    });
  }
  lingQuJiangLiSub() {
    if (this.JlBig) {
        if (this.JlBig == "rmb") {
          this.jiangli.bonus_type = 0;
        }else{
          this.jiangli.bonus_type = 1;
        }
        let lingqu_sub = {
          bonus_type: this.jiangli.bonus_type,
          rmb_r_num: this.jiangli.rmb_r_num,
          rmb_x_num: this.jiangli.rmb_x_num,
          dhb_r_num: this.jiangli.dhb_r_num,
          dhb_x_num: this.jiangli.dhb_x_num,
          tid: this.tid,
          mtid: this.mtid
        }
        this.tasksmodel.setLingquJiangli(lingqu_sub).subscribe(res => {
          if ( res ) {
            this.jiangli.isshow = false;
            // this.toastTip( " 恭喜您，领取成功！");
              this.showWord = '已获奖励';
              this.isShow = 1;
            this.computeTime = 4 ;
            this.intervalId = setInterval(() => {
                this.computeTime-- ;
                this.jiangli.isshow_ok = true;
                if (this.computeTime <= 0 ) {
                this.jiangli.isshow_ok = false;
                // this.back();
                // this.cdr.markForCheck();
                // this.cdr.detectChanges();
                // this.router.navigateByUrl("/default/renwu/mine");   //跳转
                // 停止计时
                clearInterval(this.intervalId) ;
                }
            }, 1000) ;
          } else {
            this.toastTip("领取失败！");
          }
        });

    } else {
      this.toastTip("请选要领取的奖励类型！");
    }
  }
  guanbi() {
    this.jiangli.isshow = false;
  }
  guanbi_tiaozhuan() {
    this.guanbi();
    this.back();
  }
  //警告提醒部分
  async toastTip(message: string) {
    let toast = await this.toastcon.create({
        message: message,
        duration: 2000,
        position: 'middle' //Type : 	"bottom" | "middle" | "top"
      });
    toast.present();
  }
  back() {
    this.modalCtrl.dismiss();
  }*/
    async open_renwu_jxz( link, id , task_id ) {
        switch ( link ) {
            case '/renwu-zuorenwu':
            this.GoPage = RenwuZuorenwuPage;
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
            // this.reload_page();
        });
        await  modal.present();
    }
    // async open_renwu_wc(link, id , task_id) {
    //
    //     switch (link) {
    //         case '/renwu-wancheng':
    //             this.GoPage = RenwuWanchengPage;
    //             break;
    //         case '/renwu-tongguo':
    //             this.GoPage = RenwuTongguoPage;
    //             break;
    //         case '/renwu-shenhezhong':
    //             this.GoPage = RenwuShenhezhongPage;
    //             break;
    //         case '/renwu-tongguoo':
    //             this.GoPage = RenwuTongguooPage;
    //             break;
    //     }
    //     const modal = await this.modalCtrl.create(
    //         {
    //             component: this.GoPage,
    //             componentProps: {
    //                 'id': id,
    //                 'tid': task_id
    //             }
    //         }
    //     );
    //     modal.onDidDismiss().then( res => {
    //         this.reload_page();
    //     });
    //     await  modal.present();
    // }
    getMyTaskitems(id) {
        // console.log('789');
        // this.tasks.getMytaskitems(id).subscribe(res => {
        //   this.mytaskitemList = res;
        //   // this.mytaskitemList = this.tools.decodeUrlList(this.mytaskitemList.list);
        //   console.log(this.mytaskitemList, 'this.mytaskitemList');
        // });
    }

    insertMyTasksCon(id) {
        // this.lingquCon = JSON.stringify({
        // uid:'8888',
        //   tid:id
        // })
        this.lingquCon = {
            tid: id
        };
        this.tasks.insertMyTasksCon(this.lingquCon).subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            console.log(ress, 'ressressressressressress');
            // if(ress.error == '0'){
            //     alert(ress.body);
            //     this.router.navigateByUrl('/index')
            // }else{
            //     alert(ress.body);
            // }
            if (ress.error != '0') {
                this.onTixing(decodeURIComponent(ress.body));
                return;
            }
            this.onTixing(decodeURIComponent(ress.body), '1');
        });
    }
    async onTixing( mess, type = '' ) {
        const alert = await this.alertcontroller.create( {
            backdropDismiss: false,
            message: mess,
            buttons: [      {
                text: '知道了',
                cssClass: 'baocu',
                handler: () => {
                    if (type == '1') {
                        // console.log('222');
                        this.back()
                        this.router.navigateByUrl('default/renwu/mine');   // 跳转
                        // this.router.navigate(['default/renwu/mine']);
                    } else {
                        this.back()
                        // console.log('333');
                        // this.router.navigate(['default/renwu/mine']);
                        this.router.navigateByUrl('default/renwu/mine');   // 跳转
                    }
                }
            }]
        });
        await alert.present();
    }

    renwu_con_qie(state){
        if(state == 1){
            this.renwu_con_color.renwu_color = 'ffffff';
            this.renwu_con_color.renwu_bgcolor = 'ff6600';
            this.renwu_con_color.xize_color = 'ff6600';
            this.renwu_con_color.xize_bgcolor = 'ffffff';
        }else{
            this.renwu_con_color.renwu_color = 'ff6600';
            this.renwu_con_color.renwu_bgcolor = 'ffffff';
            this.renwu_con_color.xize_color = 'ffffff';
            this.renwu_con_color.xize_bgcolor = 'ff6600';
        }
        this.renwu_con_status = state;
    }

    back() {
        this.modalCtrl.dismiss();
    }

    showBigImages( list_i, i, ti) {
        this.showBigImageState = true;
        this.big_img_count = this.tasksListCon.mytask.my_tt_list[list_i].img_name.length
        this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[list_i].img_name[i].img_name
        this.big_img_i = i;
        this.big_img_ti = ti;

    }
    swipeEvnet(event){
        // console.log('进入滑动');
        //向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            var big_img_ti = this.big_img_ti + 1;
            if(this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti] ){
                this.big_img_ti = big_img_ti;
                this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[this.big_img_ti].img_name;
            }
        }

        // 向右滑
        if (event.direction == 4) {
            // console.log('进入右滑动');
            var big_img_ti = this.big_img_ti - 1;
            if (this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti]) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[this.big_img_ti].img_name;
            }
        }
    }
    hideBigImage(){
        this.showBigImageState=false;
    }
}