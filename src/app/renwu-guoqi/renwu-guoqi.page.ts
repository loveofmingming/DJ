import { Component, OnInit } from '@angular/core';
import { TasksModel,ToolsModel,LoginModel,LocalStorageModel, MyTasksModel} from '../model';
import { ConfigModel} from '../model/config.model';
import { ActivatedRoute, Router } from '@angular/router';
import {AlertController,ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-renwu-guoqi',
  templateUrl: './renwu-guoqi.page.html',
  styleUrls: ['./renwu-guoqi.page.scss'],
})
export class RenwuGuoqiPage implements OnInit {
    mtid:string;
    tid:string;
    tasksListCon:any;
    img_url:string;

    showBigImageState: boolean;
    big_img: string;
    big_img_ti:number;
    big_img_i: number;
    big_img_count: number;
    wode_renwu_count: any;
    init:boolean;
  constructor(

      public alertcontroller:AlertController,
      public tasksmodel:TasksModel,
      public toolsmodel:ToolsModel,
      public LocalStorageModel:LocalStorageModel,
      public route: ActivatedRoute,
      public loginmodel: LoginModel,
      public router:Router,
      public modalCtrl:ModalController,
      public navParams: NavParams,
      public mytaskmodel: MyTasksModel,
  ) {
      this.img_url = ConfigModel.BASE_IMG_URL;
      // this.mtid = this.route.snapshot.paramMap.get('id');
      // this.tid = this.route.snapshot.paramMap.get('tid');
      this.mtid = this.navParams.get('id');
      this.tid = this.navParams.get('tid');
      this.tasksListCon = [];
      this.showBigImageState = false;
      this.init = true;
  }

  ngOnInit() {
      this.loginmodel.LoginSession().subscribe(res => {
          let login_info:any = this.toolsmodel.decodeUrlList(res);
          if (login_info.error != '0') {
              this.router.navigateByUrl('/home');
              return;
          } else {
              this.getTasksCon(this.mtid, this.tid);
          }
      }); // 登陆验证
  }
    // 离开页面的时候触发
    ionViewDidLeave() {
        this.init = false;
    }
    getTasksCon(mtid,tid){
        let con = {
            mtid: mtid,
            tid: tid,
        };
        this.tasksmodel.getOneMytasksWanChengCon(con).subscribe(res => {
            let ress: any = this.toolsmodel.decodeUrlList(res);
            if(ress.error == '0') {
                this.tasksListCon = ress.body;
                console.log(this.tasksListCon, ' this.tasksListConthis.tasksListCon  guoqiiiiii ');
            } else {
                this.router.navigate(['/index-tab']);
            }
        });
    }
    back() {
        this.modalCtrl.dismiss();
    }

    async open_con(tid, status) {
        const modal = await this.modalCtrl.create(
            {
                component: RenwuGuoqiPage,
                componentProps: {
                    'tid': tid,
                    'status': status
                }
            }
        );
        modal.onDidDismiss().then(res=>{
            // this.reload_page();
        });
        await  modal.present();
    }


    insertMyTasksCon(id) {
        // this.lingquCon = JSON.stringify({
        //   uid:this.user_id,
        //   tid:id
        // })
        let con = {
            tid: id
        };
        this.tasksmodel.insertMyTasksCon(con).subscribe(res => {
            let in_res: any = res;
            // console.log(in_res,'in_resin_resin_resin_resin_res');
            if (in_res.error != '0') {
                this.onTixing(decodeURIComponent(in_res.body));
                return;
            }
            this.onTixing(decodeURIComponent(in_res.body), '1');
        });
        // this.router.navigate(['default/renwu/mine']);
        // let selTab = this.tabRef.getSelected();
        // this.router.navigateByUrl('/default/renwu/'+selTab);
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

    showBigImages( list_i , i, ti){
        this.showBigImageState = true;
        this.big_img_count = this.tasksListCon.mytask.my_tt_list[list_i].img_name.length
        this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[list_i].img_name[i].img_name
        // console.log(this.big_img_count, 'this.big_img_count');
        // console.log(this.big_img, 'this.big_img');
        this.big_img_i = list_i;
        this.big_img_ti = i;

    }
    swipeEvnet(event) {
        // console.log('进入滑动');
        // 向左滑
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
            // console.log('进入左滑动');
            var big_img_ti = this.big_img_ti - 1;
            // console.log(this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti]);
            if (this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti]) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.img_url + '/' + this.tasksListCon.mytask.my_tt_list[this.big_img_i].img_name[this.big_img_ti].img_name;
            }
        }
    }
    hideBigImage() {
        this.showBigImageState = false;
    }
   
}
