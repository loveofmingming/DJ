import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolsModel, UpdateUserInfoModel, CameraModel, LoginModel, LocalStorageModel, XiaoJinKusModel} from '../model';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ConfigModel } from '../Model/config.model';
import { Router } from '@angular/router';
import {ModalController,ToastController} from '@ionic/angular';
import { MessageService } from '../service/message.service';
// import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router';// 跳转类库
import { Alert } from 'selenium-webdriver';
import { allSettled } from 'q';

@Component({
    selector: 'app-wode-gengduo',
    templateUrl: './wode-gengduo.page.html',
    styleUrls: ['./wode-gengduo.page.scss'],
})
export class WodeGengduoPage implements OnInit {
    userName: any;
    userName1: any;
    userCompany: any;
    userTouxiang: any;
    userTouxiang1: any ;
    userId: any;
    obj: any  ;
    msg: any;
    private img_url: string = ConfigModel.BASE_IMG_USER_URL;
    userInfo: any;

    constructor(
                public toastController: ToastController,
                private messageService: MessageService,
                public router: Router,
                public alertController: AlertController,
                public updateUserInfoModel: UpdateUserInfoModel,
                public toolsmodel: ToolsModel,
                public actionSheetController: ActionSheetController,
                public camera: CameraModel,
                public loginmodel: LoginModel,
                public localstorageModel: LocalStorageModel,
                public _router: Router,
                public xiaojinkusModel: XiaoJinKusModel,
                private modalCtrl: ModalController
    ) {
        this.userName = '';
        this.userCompany = '';
        this.userTouxiang = '';
        this.userId = '';
        this.userInfo = [];
    }
    ngOnInit() {
        this.loginmodel.LoginSession().subscribe(res => {
            let login_info: any = this.toolsmodel.decodeUrlList(res);
            if (login_info.error != '0') {
                this._router.navigateByUrl('/home');
                return;
            } else {
                this.userId = login_info.body.id;
                this.getUserInfo();
            }
        }); // 登陆验证

    }

    getUserInfo() {
        this.xiaojinkusModel.getUserInfoByUserId().subscribe(res => {
            let ress: any = this.toolsmodel.decodeUrlList(res);
            if (ress.error == '0') {
                this.userInfo = ress.body;
            } else {
                this.userInfo = ress.body;
            }
            this.getuserTouxiang();
            this.getuserName();
            this.getuserCompany();
        });
    }

// 获取用户的头像信息
    getuserTouxiang() {
        this.userTouxiang = this.img_url + '/' + this.userInfo.touxiang;
        this.userTouxiang1 = this.img_url + '/' + this.userInfo.touxiang;
    }
// 获取用户真实姓名
    getuserName() {
        this.userName = this.userInfo.realname;
        this.userName1 = this.userInfo.realname;
    }
    getuserCompany() {
        this.userCompany = this.userInfo.company;
    }

    // sendMessage( userTouxiang1: string, ) {
    //     this.messageService.messageAction(userTouxiang1);
    //     this.router.onSameUrlNavigation = 'reload';
    //     this.router.navigateByUrl('/default/wode');
    //
    // }
    // sendMessage1(userName1: string) {
    //     this.messageService.messageAction(userName1);
    //     this.router.onSameUrlNavigation = 'reload';
    //     this.router.navigateByUrl('/default/wode');
    // }
    sendMessage( msg: any) {
        msg = {
            userTouxiang1: this.userTouxiang1,
            userName1: this.userName1
        }
        this.messageService.messageAction(msg);
        // if (msg) {
        //     this.messageService.messageAction(msg);
        // }
        // console.log(this.userName1,'userName1');
        // console.log(msg,'msgmsgmsgmsgmsgmsgmsgmsgmsg');
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('/default/wode');

    }


    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle',
        });
        toast.present();
    }
// 修改姓名
    async on_name() {
        const alert = await
            this.alertController.create({
                // backdropDismiss: false,
                header: '修改姓名',
                cssClass: 'gongsi',
                inputs: [
                    {
                        name: 'name1',
                        type: 'text',
                        placeholder: '请输入姓名！'
                    }
                ],
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel',
                        cssClass: 'primary',
                        handler: () => {
                            // console.log('Confirm Cancel');
                        }
                    }, {
                        text: '保存',
                        cssClass: 'sure',
                        handler: (value) => {
                            if (value.name1 == '') {
                                // this.tishiUpdateFail('用户名不能为空');
                                this.presentToast('用户名不能为空')
                            } else {
                                if (value.name1.length < 2) {
                                    // this.tishiUpdateFail('用户名的长度不能小于2个字符！');
                                    this.presentToast('用户名的长度不能小于2个字符')
                                } else if (value.name1.length > 5) {
                                    // this.tishiUpdateFail('用户名的长度不能大于5个字符！');
                                    this.presentToast('用户名的长度不能大于5个字符')

                                } else {
                                    let con = {
                                        username: value.name1,
                                    }
                                    this.updateUserInfoModel.updateInfoNameByInfoid(con).subscribe(res => {
                                        let ress: any = this.toolsmodel.decodeUrlList(res);
                                        if (ress.error == '0') {
                                            this.userName = value.name1;
                                            this.userName1 = value.name1;
                                            // console.log(this.userName1,'this.userName111111111');
                                            // this.sendMessage1(this.userName1)
                                            // this.tishiUpdateSuccess('修改用户名成功！');
                                            this.presentToast('修改用户名成功')
                                        } else {
                                            this.tishiUpdateFail(ress.body);
                                        }
                                    });
                                }
                            }
                        }
                    }
                ]
            });
        return await
            alert.present();
    }

    tishiUpdateSuccess(content) {

        alert(content);
    }

    tishiUpdateFail(content) {
        alert(content);
    }

// 修改公司名称
    async on_gs_name() {
        const alert = await
            this.alertController.create({
                // backdropDismiss: false,
                cssClass:'gongsi',
                header: '公司名称',
                inputs: [
                    {
                        name: 'name1',
                        type: 'text',
                        placeholder: '请输入公司名称！',
                    }
                ],
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel',
                        cssClass: 'primary',
                        handler: () => {
                            // console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: '保存',
                        cssClass: 'sure',
                        handler: (value) => {
                            if (value.name1 == '') {
                                // this.tishiUpdateFail('所在公司名称不能为空');
                                this.presentToast('所在公司名称不能为空')
                            } else {
                                if (value.name1.length < 2) {
                                    // this.tishiUpdateFail('所在公司名称的长度不能小于2个字符！');
                                    this.presentToast('所在公司名称的长度不能小于2个字符')
                                } else if (value.name1.length > 30) {
                                    // this.tishiUpdateFail('所在公司名称的长度不能大于30个字符！');
                                    this.presentToast('所在公司名称的长度不能大于30个字符')
                                } else {
                                    let con = {
                                        company: value.name1
                                    }
                                    this.updateUserInfoModel.updateCompanyByInfoid(con).subscribe(res => {
                                        let ress: any = this.toolsmodel.decodeUrlList(res);
                                        if (ress.error == '0') {
                                            this.userCompany = value.name1;
                                            // this.tishiUpdateFail('修改所在公司名称成功！');
                                            this.presentToast('修改所在公司名称成功')
                                        } else {
                                            // this.tishiUpdateFail(ress.body);
                                            this.presentToast('ress.body')
                                        }
                                    });
                                }
                            }
                        }
                    }
                ]
            });
        return await
            alert.present();
    }

    up_touxiang() {
        this.presentActionSheet();
    }
    async presentActionSheet() {
        const actionSheet = await
            this.actionSheetController.create({
                header: '选择上传方式',
                buttons: [{
                    text: '拍照上传',
                    icon: 'share',
                    handler: () => {
                        // let res_info = this.camera.camera_touxiang_play_from_camera();
                        // // let options = this.came_options;
                        // // this.camera.getPicture(options).then((imageData) => {
                        // //   this.setImgTypeUrl(type,index,imageData);
                        // // }, (err) => {
                        // //   // Handle error
                        // // });          console.log('拍照上传');
                        // let ress = this.toolsmodel.decodeUrlList(res_info);
                        // console.log(ress);
                        this.camera.getPicModel(100, 0, 0, 0, true, 1, 1024, 1024).then((imageData) => {
                            this.userTouxiang = 'data:image/jpeg;base64,' + imageData;
                            if (imageData) {
                                this.userTouxiang1 = 'data:image/jpeg;base64,' + imageData;
                            }
                            // alert('上传成功');
                            this.camera.doUploadTouXiang(imageData, 'touxiang_photo' );
                        });
                    }
                }, {
                    text: '从相册选取上传',
                    icon: 'share',
                    handler: () => {
                        // let res_info = this.camera.camera_touxiang_play_from_picture();
                        // this.camera.camera_touxiang_play_from_picture()
                        this.camera.getPicModel(100, 0, 0, 0, false, 0, 1024, 1024).then((imageData) => {
                            this.userTouxiang = 'data:image/jpeg;base64,' + imageData;
                            if (imageData) {
                                this.userTouxiang1 = 'data:image/jpeg;base64,' + imageData;
                            }
                            // alert('上传成功');
                            this.camera.doUploadTouXiang(this.userTouxiang, 'touxiang_photo' );

                            // this.router.navigateByUrl("default/renwu/mine");   //跳转
                        });
                    }
                }, {
                    text: '取消',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }]
            });
        await
            actionSheet.present();
    }
}


