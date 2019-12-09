import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';
import { ToolsModel, DaoHangBisModel, LoginModel} from '../model';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-daohangbi',
  templateUrl: './daohangbi.page.html',
  styleUrls: ['./daohangbi.page.scss'],
})

export class DaohangbiPage implements OnInit {
  shouruList: any;
  daohangbiYue: any;
  daohangbiType: any;
  userId: any;
  constructor(
        public alertController: AlertController,
        public daohangbisModel: DaoHangBisModel,
        public toolsmodel: ToolsModel,
        public router:Router,
        public loginmodel: LoginModel
    ) {
    this.shouruList = [];
    this.daohangbiYue = '';
    this.daohangbiType = '';
    this.userId = '';
}
    ngOnInit() {
        
      this.loginmodel.LoginSession().subscribe(res => {
        let login_info:any = this.toolsmodel.decodeUrlList(res);
        if(login_info.error != '0'){
            this.router.navigateByUrl('/home');
            return;
        }else{
            this.userId = login_info.body.id;
            this.getAllDaohangbiZhuanRu();
            this.getAllDaohangbiYue();
        }
      }); // 登陆验证
    }
    // getUserInfoid() {
    //     this.userId = window.localStorage.getItem('userId');
    // }
    // 根据infoid获取小金库 的余额
    getAllDaohangbiYue() {
      this.daohangbisModel.getAllDaohangbiYueByInfoId().subscribe(res => {
          let ress:any = this.toolsmodel.decodeUrlList(res);
          if(ress.error=='0'){
                this.daohangbiYue = ress.body;
          }
      });
  }
    getAllDaohangbiZhuanRu() {
        this.daohangbisModel.getAllDaohangbiZhuanRuByInfoId().subscribe(res => {

            let ress:any = this.toolsmodel.decodeUrlList(res);
            this.daohangbiType = 'zhuanru';
            if (ress.error != '0') {
                this.shouruList = 1;
            } else {
                this.shouruList = ress.body;
                console.log(this.shouruList,' this.shouruList this.shouruList');
                // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
            }
        });
    }
    getAllDaohangbiZhuanChu() {
        this.daohangbisModel.getAllDaohangbiZhuanChuByInfoId().subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            this.daohangbiType = 'zhuanchu';
            if (ress != '0') {
                this.shouruList = 1;
            } else {
                this.shouruList = ress.body;
                // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
            }
        });
  }

}
