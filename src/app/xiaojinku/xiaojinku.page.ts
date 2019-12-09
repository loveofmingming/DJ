import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToolsModel, XiaoJinKusModel, LoginModel} from '../model';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';  


@Component({
  selector: 'app-xiaojinku',
  templateUrl: './xiaojinku.page.html',
  styleUrls: ['./xiaojinku.page.scss'],
})
export class XiaojinkuPage implements OnInit {
    shouruList: any;
    xiaojinkuYue: any;
    xiaojinkuType: any;
    userId: any;
    constructor(
            private cdr: ChangeDetectorRef,
            public alertController: AlertController,
            public xiaojinkusModel: XiaoJinKusModel,
            public toolsmodel: ToolsModel,
            public router: Router,
            public loginmodel: LoginModel,
        ) {
        this.shouruList = [];
        this.xiaojinkuYue = '';
        this.xiaojinkuType = '';
        this.userId = '';
    }
    ngOnInit() {
        // console.log('1 23');
        this.loginmodel.LoginSession().subscribe(res => {
            let login_info:any = this.toolsmodel.decodeUrlList(res);
            if(login_info.error != '0'){
                this.router.navigateByUrl('/home');
                return;
            } else {
            this.userId = login_info.body.id;
            this.getAllXiaojinkuYue();
            this.getAllXiaojinkuZhuanRu();
            }
        }); // 登陆验证
        // this.loginmodel.LoginSession(); // 登陆验证
        // this.getUserInfoid();
    }
    async onTixing() {
      const alert = await this.alertController.create( {
        backdropDismiss: false,
        message: '请添加 微信号：13241994107<br>红包提现。',
        buttons: [
            {
                text: '好的',
                cssClass: 'baocu',
                handler: () => {
                    // console.log('zhidaole');
                }
            }
        ]
      });
      await alert.present();
    }
    // 根据infoid获取小金库 的余额
    // getUserInfoid() {
    //     this.userId = window.localStorage.getItem('userId');
    // }
    getAllXiaojinkuYue() {
        this.xiaojinkusModel.getAllXiaoJinKuYueByInfoId().subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if(ress.error=='0'){
                this.xiaojinkuYue = ress.body;
                // console.log(this.xiaojinkuYue,'this.xiaojinkuYuethis.xiaojinkuYue123');
            }else{
                this.xiaojinkuYue = 0;
            }
        });
    }
    // 根据infoid获取小金库的转入记录
    getAllXiaojinkuZhuanRu() {
        // console.log('1234');
        this.xiaojinkusModel.getAllXiaoJinKuZhuanRuByInfoId().subscribe(res => {

            this.xiaojinkuType = 'zhuanru';
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if (ress.error != '0') {
                this.shouruList = 1;
            } else {
                this.shouruList = ress.body;
                // console.log(this.shouruList, 'this.shouruList456');
                // console.log(this.shouruList, 'this.shouruList252525252525');
                // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
            }
        });
    }
    // 根据infoid获取小金库的转出记录
    getAllXiaojinkuZhuanChu() {
      this.xiaojinkusModel.getAllXiaoJinKuZhuanChuByInfoid().subscribe(res => {
          this.xiaojinkuType = 'zhuanchu';
          let ress:any = this.toolsmodel.decodeUrlList(res);
          if (ress != '0') {
            this.shouruList = 1;
          } else {
            this.shouruList = ress.body;
            // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
          }
      });
  }

}
