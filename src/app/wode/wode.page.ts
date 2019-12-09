import { Component, OnInit , OnDestroy , ChangeDetectorRef } from '@angular/core';
import { AlertController, } from '@ionic/angular';
import { ActivatedRoute , Router } from '@angular/router';
import { ToolsModel, XiaoJinKusModel, DaoHangBisModel, XinYuZhisModel, LoginModel, LocalStorageModel} from '../model';
import { ConfigModel } from '../Model/config.model';
import { Alert } from 'selenium-webdriver';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs/Subscription';
// import {  ionViewDidEnter } from '@ionic/angular';
// import { OnEnterPage } from '../model/on-enter-page';
@Component({
  selector: 'app-wode',
  templateUrl: './wode.page.html',
  styleUrls: ['./wode.page.scss'],
})
export class WodePage implements OnInit  {
  xiaojinkuYue: any;
  daohangbiYue: any;
  xinyuzhiYue: any;
  userName: any;
  userName1: any;
   obj: any ;
  uid: any;
  userTouxiang: any;
  userTouxiang1: any;
  userInfo: any;
  sub: Subscription;
  msg: any = {
      userTouxiang1: this.userTouxiang,
      userName1: this.userName
  };
  // private img_url: string = ConfigModel.BASE_TASK_LIST_IMG;
  private img_url: string = ConfigModel.BASE_IMG_USER_URL;
  constructor(
        private cdr: ChangeDetectorRef,
        private messageService: MessageService,
        public alertController: AlertController,
        public toolsmodel: ToolsModel,
        private router: Router,
        public xiaojinkusModel: XiaoJinKusModel,
        public daohangbisModle: DaoHangBisModel,
        public xinyuzhisModel: XinYuZhisModel,
        public loginmodel: LoginModel,
        public localstorageModel: LocalStorageModel,
        public _route: ActivatedRoute,
     ) {
        this.xiaojinkuYue = '';
        this.daohangbiYue = '';
        this.xinyuzhiYue = '';
        this.userName = '';
        this.uid = '';
        this.userTouxiang = '';
        this.userInfo = [];
    }


  ngOnInit() {
      // this.messageService.message$.subscribe(userTouxiang1  => this.userTouxiang1 = userTouxiang1);
      // this.messageService.message$.subscribe(userName1 => this.userName1 = userName1);
      this.loginmodel.LoginSession().subscribe(res => {
      let login_info: any = this.toolsmodel.decodeUrlList(res);
      if (login_info.error != '0') {
          this.router.navigateByUrl('/home');
          return;
      } else {
        this.uid = login_info.body.id;
        this.getUserInfoByUserId()
          // console.log('9090');
      }
    }); // 登陆验证
      // this.loginmodel.LoginSession(); // 登陆验证
      // this.getUserId();
      // this.getUserInfoByUserId();
      this.messageService.message$.subscribe(msg => this.msg = msg);
  }
  // getUserId() {
  //    this.uid = this.localstorageModel.getStore('userId');
  // }
    ionViewDidEnter(): void {
        // console.log('进入wode页面');
        this.getUserInfoByUserId();
    }
    // ngOnDestroy(): void {
    //     this.sub.unsubscribe();  // 不要忘记取消订阅
    // }
    goShezhi() {
        // console.log('shezhi');
        // this.router.navigate(['/shezhi']);
        this.router.navigateByUrl('/shezhi');
    }
  getUserInfoByUserId() {
      // console.log('288888');
      this.xiaojinkusModel.getUserInfoByUserId().subscribe(res => {
      const ress: any = this.toolsmodel.decodeUrlList(res);
        if (ress.error == '0') {
          this.userInfo = ress.body;
        // console.log(this.userInfo,'this.userInfo 0000000000000');
          this.getAllXiaojinkuYue();
          this.getAllDaohangbiYue();
          this.getAllXinyuzhiYue();
          this.getuserName();
          this.getuserTouxiang();


        } else {
          this.userInfo = ress.body;
        }
     });
  }
    getUserInfo() {
        this.xiaojinkusModel.getUserInfoByUserId().subscribe(res => {
            let ress: any = this.toolsmodel.decodeUrlList(res);
            if (ress.error == '0') {
                this.userInfo = ress.body;
            } else {
                this.userInfo = ress.body;
            }
            // console.log(this.userInfo,'this.userInfothis.userInfo');
            this.getuserTouxiang();
            this.getuserName();
            // this.getuserCompany();
            // console.log('zhixinglleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        });
    }
  // 获取用户的头像信息
  getuserTouxiang() {
    // this.userTouxiang1 = this.userInfo.touxiang;
    this.userTouxiang = this.userInfo.touxiang;
  }
  // 获取用户真实姓名
  getuserName() {
    this.userName = this.userInfo.realname;
  }
  // 获取小金库的余额
  getAllXiaojinkuYue() {
    this.xiaojinkuYue = this.userInfo.balance_rmb;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  // 获取导航币的余额
  getAllDaohangbiYue() {
    this.daohangbiYue = this.userInfo.balance_dhb;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  // 获取信誉值
  getAllXinyuzhiYue() {
    this.xinyuzhiYue = this.userInfo.credit;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

}
