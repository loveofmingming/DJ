import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksModel,ToolsModel,CameraModel,LocalStorageModel,LoginModel} from '../model';
import { ConfigModel} from '../model/config.model';
import {ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-renwu-weitongguo',
  templateUrl: './renwu-weitongguo.page.html',
  styleUrls: ['./renwu-weitongguo.page.scss'],
})
export class RenwuWeitongguoPage implements OnInit {
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
  constructor(
              public modalCtrl: ModalController,
              public route: ActivatedRoute,
              public router: Router,
              public tasks: TasksModel,
              public LocalStorageModel: LocalStorageModel,
              public toolsmodel: ToolsModel,
              public loginmodel: LoginModel,
              public camera: CameraModel,
              ) {
    this.serve_img_url = ConfigModel.BASE_IMG_URL;
    this.img_url = ConfigModel.BASE_IMG_URL;
    this.id = this.route.snapshot.paramMap.get('id');
    this.tid =  this.route.snapshot.paramMap.get('tid');
    this.renwu_submit_status = this.route.snapshot.paramMap.get('status');
    this.tasksListCon = [];
    this.mytaskitemList = [];
   // console.log(this.renwu_submit_status);
    this.renwu_con_color = [];
  }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info: any = this.toolsmodel.decodeUrlList(res);
      if (login_info.error != '0') {
        this.router.navigateByUrl('/home');
        return;
       } else {
        this.getTasksCon(this.id,this.tid);
        this.getMyTaskitems(this.id);
        this.renwu_con_status = 1;
        this.renwu_con_color.renwu_color = 'ffffff';
        this.renwu_con_color.renwu_bgcolor = 'ff6600';
        this.renwu_con_color.xize_color = 'ff6600';
        this.renwu_con_color.xize_bgcolor = 'ffffff';
      }
    }); // 登陆验证

  }
  getTasksCon(mtid,tid){
    let con = {
      mtid: mtid,
      tid: tid,
    };
    this.tasks.getOneMytasksWeiTongGuoCon(con).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
          this.tasksListCon = ress.body;
      }else{
        this.router.navigate(['/index-tab']);
      }
    });
  }

  getMyTaskitems(id){
    // this.tasks.getMytaskitems(id).subscribe(res => {
    //   this.mytaskitemList = res;
    //   this.mytaskitemList = this.tools.decodeUrlList(this.mytaskitemList.list);
    //   //console.log(this.mytaskitemList);
    // });
  }
  
  insertMyTasksCon(id){
    // this.lingquCon = JSON.stringify({
    // uid:'8888',
    //   tid:id
    // })
    this.lingquCon = {
      tid:id
    };
    this.tasks.insertMyTasksCon(this.lingquCon).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
          alert(ress.body);
          this.router.navigateByUrl('/index')
      }else{
        alert(ress.body);
      }
    });
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
}


