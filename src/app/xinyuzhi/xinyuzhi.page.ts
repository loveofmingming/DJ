import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToolsModel, XinYuZhisModel, LoginModel} from '../model';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-xinyuzhi',
  templateUrl: './xinyuzhi.page.html',
  styleUrls: ['./xinyuzhi.page.scss'],
})
export class XinyuzhiPage implements OnInit {
  shouruList: any;
  xinyuzhiYue: any;
  userId: any;
  showBigImageState: boolean;
  constructor(
          public alertController: AlertController,
          public xinyunzhisModel: XinYuZhisModel,
          public toolsmodel: ToolsModel,
          public router: Router,
          public loginmodel: LoginModel
      ) {
      this.xinyuzhiYue = '';
      this.shouruList = [];
      this.userId = '';
      this.showBigImageState = false;
  }
  async onTixing() {
    const alert = await this.alertController.create( {
      message: '信誉值是什么？</br>信誉值是用户对导航网的贡献值：</br>》信誉值越高，可领取任务越多：</br>信誉值区间       进行中任务项数',
      buttons: ['好的']
    });
    await alert.present();
  }
  ngOnInit() {
    
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
          this.router.navigateByUrl('/home');
          return;
      }else{
        this.userId = login_info.body.id;
        this.getAllXinYuZhiYue();
        this.getAllXinYuShouRu();
      }
    }); // 登陆验证
  }
  getUserInfoid() {
      this.userId = window.localStorage.getItem('userId');
  }
  getAllXinYuZhiYue() {
      this.xinyunzhisModel.getAllXinYuZhiYueByInfoId().subscribe(res => {
          let ress:any = this.toolsmodel.decodeUrlList(res);
          this.xinyuzhiYue = ress.body;
      });
  }
  getAllXinYuShouRu() {
      this.xinyunzhisModel.getAllXinYuZhiZhuanRuByInfoId().subscribe(res => {
          let ress:any = this.toolsmodel.decodeUrlList(res);
          if (ress.error != '0') {
              this.shouruList = ress.body;
          } else {
              this.shouruList = ress.body;
              // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
          }
      });
  }

  hideBigImage() {
    this.showBigImageState = false;
  }

  showBigImage() {
    this.showBigImageState = true;
  }

}
