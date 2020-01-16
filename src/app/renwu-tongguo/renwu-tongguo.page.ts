import { Component, OnInit , ChangeDetectorRef , OnDestroy } from '@angular/core';
import { TasksModel,ToolsModel,LoginModel,LocalStorageModel} from '../model';
import { ConfigModel} from '../model/config.model';
import { ToastController } from '@ionic/angular';   //弹窗类库
import { ActivatedRoute, Router } from '@angular/router';
import {ModalController,NavParams } from '@ionic/angular';

import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';

// import {ViewController} from 'ionic-angular';

@Component({
  selector: 'app-renwu-tongguo',
  templateUrl: './renwu-tongguo.page.html',
  styleUrls: ['./renwu-tongguo.page.scss'],
})
export class RenwuTongguoPage implements OnInit {
    GoPage: any;

  mtid:string;
  tid:string;
  tasksListCon:any;
  img_url:string;
  tasksJiangLiCon:any;
  lingquJiangliJieguo:any;
  JlBig:string;
  computeTime:any;
  intervalId:any;
  isShow: any;
  showWord:any;

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
    public tasksmodel: TasksModel,
    public toolsmodel: ToolsModel,
    public LocalStorageModel: LocalStorageModel,
    public route: ActivatedRoute,
    public router: Router,
    public loginmodel: LoginModel,
    public toastcon: ToastController,
    public modalCtrl: ModalController,
    public navParams: NavParams
    ) {
    this.img_url = ConfigModel.BASE_IMG_URL;
    // this.mtid = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');

    this.mtid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');

    this.tasksListCon = [];
    this.tasksJiangLiCon = [];
    this.lingquJiangliJieguo = [];
    this.showWord = '领取奖励';
    this.showBigImageState=false;
  }
  ngOnInit() {
      // this.getTasksCon(this.mtid, this.tid);
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info : any = this.toolsmodel.decodeUrlList(res);
      if (login_info.error != '0') {
        this.router.navigateByUrl('/home');
        return;
      } else {
        this.getTasksCon(this.mtid, this.tid);
      }
    }); // 登陆验证
  }




   /**
   * 获取任务详情
   * @param id
   */
  getTasksCon( mtid, tid ) {
    let con = {
      mtid: mtid,
      tid: tid,
    };
    this.tasksmodel.getOneMytasksTongGuoCon(con).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if (ress.error == '0') {
          this.tasksListCon = ress.body;
          console.log(this.tasksListCon,'this.ssssssssssssssssssssssss');
      } else {
        this.router.navigate(['/index-tab']);
      }
    });
  }

  lingQuJiangLi() {
  let  lingqu_con = {
        tid: this.tid,
        mtid: this.mtid
    }
    this.tasksmodel.getOneTaskJiangliById(lingqu_con).subscribe(res => {
      this.tasksJiangLiCon = res;
      // console.log(this.tasksJiangLiCon,'12121212121212121212');
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
                this.back();
                // this.cdr.markForCheck();
                // this.cdr.detectChanges();
                this.router.navigateByUrl("/default/renwu/mine");   //跳转
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

    async open_renwu_finish( link, id ,  task_id ) {
        switch ( link ) {
            case '/renwu-wancheng':
                this.GoPage = RenwuWanchengPage;
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
  }
  // back2(){
  //     this.viewCtrl.dismiss({
  //         'action': this.danyuan_id,
  //     });
  // }
  // back1() {
  //   this.router.navigateByUrl("/default/renwu/mine");   //跳转
  // }
    showBigImages(i, ti, ni) {
        this.showBigImageState = true;
        this.big_img_count = this.tasksListCon.mytask.my_tt_list[i].img_name.length
        this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[i].img_name[ti].img_name
        // console.log(this.big_img_count, 'this.big_img_count');
        // console.log(this.big_img, 'this.big_img');
        this.big_img_i = i;
        this.big_img_ti = ti;
        // this.big_img_count = this.tasksListCon.tt_list[i].img_name.length;
        // this.big_img = this.tasksListCon.tt_list[i].img_name[ti];
        // this.big_img_i = i;
        // this.big_img_ti = ti;
    }
    swipeEvnet(event) {
        // console.log('进入滑动');
        // 向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            var big_img_ti = this.big_img_ti + 1;
            if (this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti] ) {
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
