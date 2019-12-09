import { Component, OnInit } from '@angular/core';
import { TasksModel,ToolsModel,LoginModel,LocalStorageModel} from '../model';
import { ConfigModel} from '../model/config.model';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalController,NavParams } from '@ionic/angular'; 
import {RenwuConPage} from '../renwu-con/renwu-con.page';
@Component({
  selector: 'app-renwu-shenhezhong',
  templateUrl: './renwu-shenhezhong.page.html',
  styleUrls: ['./renwu-shenhezhong.page.scss'],
})
export class RenwuShenhezhongPage implements OnInit {
      mtid: string;
      tid: string;
      tasksListCon: any;
      img_url: string;
      tasksListCon_mytask_action_records: any;
      tasksListCon_mytask_my_tt_list: any;
      showBigImageState: boolean;
      big_img: string;
      big_img_ti:number;
      big_img_i: number;
      big_img_count: number;
  constructor(
    public tasksmodel:TasksModel,
    public toolsmodel:ToolsModel,
    public LocalStorageModel:LocalStorageModel,
    public loginmodel: LoginModel,
    //public localNotifications: LocalNotifications,
    public route: ActivatedRoute,
    public router:Router,              
    public modalCtrl:ModalController,
    public navParams: NavParams
    ) {
    this.img_url = ConfigModel.BASE_IMG_URL;
    // this.mtid = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');
    this.mtid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');
    this.tasksListCon = [];
    this.tasksListCon_mytask_action_records = [];
    this.tasksListCon_mytask_my_tt_list = [];

    this.showBigImageState = false;
  }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
        this.router.navigateByUrl('/home');
        return;
      }else{
        this.getTasksCon(this.mtid,this.tid);
      }
    }); // 登陆验证
     //this.getTasksCon(this.mtid,this.tid); 
  }
   /**
   * 获取任务详情
   * @param mtid 
   */
  getTasksCon(mtid,tid){
    let con = {
      mtid: mtid,
      tid: tid,
    };
    this.tasksmodel.getOneMytasksShenhezhongCon(con).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
          this.tasksListCon = ress.body;
          // this.tasksListCon_mytask_action_records = ress.body.mytask.action_records;
          // this.tasksListCon_mytask_my_tt_list = ress.body.mytask.my_tt_list;
          // console.log(this.tasksListCon,'shenghezhongzhongzhogn0000000');

      }else{
        this.router.navigate(['/index-tab']);
      }
   	});
   }
    hideBigImage() {
        this.showBigImageState = false;
    }
    showBigImages(list_i, i, ti){
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
   back() {
    this.modalCtrl.dismiss();
   }

   async open_con(tid, status ) {
    const modal = await this.modalCtrl.create(
        {
            component: RenwuConPage,
            componentProps: {
                'tid': tid,
                'status': status
            }
        }
    );
    await  modal.present();
}


}
