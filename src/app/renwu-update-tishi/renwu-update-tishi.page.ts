import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigModel} from '../model/config.model';
import { ToolsModel, MyTasksModel, LoginModel} from '../model';
import {ModalController, NavParams , AlertController} from '@ionic/angular';
import {RenwuConPage} from '../renwu-con/renwu-con.page';
import { RenwuUpdatePage } from '../renwu-update/renwu-update.page';
import { MessageService } from '../service/message.service';

declare var BMap;
@Component({
  selector: 'app-renwu-update-tishi',
  templateUrl: './renwu-update-tishi.page.html',
  styleUrls: ['./renwu-update-tishi.page.scss'],
})
export class RenwuUpdateTishiPage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    mid: string;
    tid: string;
    user_id: any;
    taskInfo: any;
    dizhi_type: string;
    gps_address: string;
    img_url: string;
    update: string;
    showBigImageState: boolean;
    big_img:string;
    big_img_ti:number;
    big_img_i:number;
    big_img_count:number;
    is_back: any;
    constructor(
        private messageService: MessageService,
        public alertController: AlertController,
        public route: ActivatedRoute,
        public router: Router,
        public mytasksmodel: MyTasksModel,
        public toolsmodel: ToolsModel,
        public loginmodel: LoginModel,
        public modalCtrl: ModalController,
        public navParams: NavParams
    ) {
        this.img_url = ConfigModel.BASE_IMG_URL;
        // this.mid = this.route.snapshot.paramMap.get('id');
        // this.tid = this.route.snapshot.paramMap.get('tid');
        this.mid = this.navParams.get('id');
        this.tid = this.navParams.get('tid');
        this.user_id = '';
        this.dizhi_type = '1';
        this.taskInfo = [];
        this.update = '0';
        this.showBigImageState = false;
    }
    ngOnInit() {
        this.loginmodel.LoginSession().subscribe(res => {
        let login_info: any = this.toolsmodel.decodeUrlList(res);
        if (login_info.error != '0') {
            this.router.navigateByUrl('/home');
            return;
        } else {
            this.user_id = login_info.body.id;
            this.getUpdateMyTaskInfo(this.tid, this.mid);

        }
        }); // 登陆验证
    }
    ionViewDidEnter(): void {
        this.messageService.message$.subscribe(is_back => this.is_back = is_back);
        // console.log(this.is_back, 'this.is_backthis.is_backthis.is_backthis.is_back11111111111');

    }
    getUpdateMyTaskInfo(tid, mid) {
        let con = {
            tid:tid,
            mid:mid
          };
        this.mytasksmodel.getInfoMyTaskAllById(con).subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if (ress.error == '0') {
                this.taskInfo = ress.body;
                console.log(this.taskInfo, 'taskInfo.task11111111111111111111111111');
                if (this.taskInfo) {
                    this.get_address_bybaidumap_shouquan(this.taskInfo.task.lon + 0.006000, this.taskInfo.task.lat + 0.010000);
                }
            } else {
                alert(ress.body);
            }
        });
    }

    /**
     * @param x 授权获取百度地图具体位置
     * @param y
     */
    get_address_bybaidumap_shouquan(x, y) {
        let that = this;
        // 原始GPS坐标转为百度坐标
        var baiduPoint = new BMap.Point(y, x);
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint, function(result) {
            if (result) {
                that.dizhi_type = '0';
                that.gps_address = result.address;
            } else {
                return 'err';
            }
        });
    }

    async fangqiUpdate() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: '确定要放弃修改吗?',
            cssClass: 'primary',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'primary',
                    handler: () => {
                        // console.log('Confirm Cancel');
                        // this.modalCtrl.dismiss();
                    }
                }, {
                    text: '确定',
                    cssClass: 'sure',
                    handler: (value) => {
                            let updateData = {
                                mid:this.mid,
                                tid:this.tid
                              };
                        console.log('111');
                        this.update = '1';
                            this.mytasksmodel.fangqiUpdate(updateData).subscribe(res => {
                            // console.log(updateData, 'updateData;;;;;;;;;;;;;;;;;;;;;;');
                                console.log('222');
                                let ress:any = this.toolsmodel.decodeUrlList(res);
                                if (ress.error =='0') {
                                    // alert(ress.body);
                                    this.onTixing(ress.body);
                                    // console.log(ress.body, 'ress.body 0');
                                } else {
                                    // alert(ress.body);
                                    this.onTixing(ress.body)
                                    // console.log(ress.body, 'ress.body');
                                }
                            });
                    }
                }
            ]
        });
        await alert.present();
        // if (confirm('确定要放弃修改吗？')) {
        //     let updateData = {
        //         mid:this.mid,
        //         tid:this.tid
        //       };
        //     this.update = '1';
        //     this.mytasksmodel.fangqiUpdate(updateData).subscribe(res => {
        //         console.log(updateData, 'updateData;;;;;;;;;;;;;;;;;;;;;;');
        //         let ress:any = this.toolsmodel.decodeUrlList(res);
        //         if (ress.error =='0') {
        //             alert(ress.body);
        //             console.log(ress.body, 'ress.body 0');
        //             this.back();
        //         } else {
        //             alert(ress.body);
        //             console.log(ress.body, 'ress.body');
        //             this.back();
        //         }
        //     });
        // }
    }
    async onTixing(mess) {
        const alert = await this.alertController.create( {
            backdropDismiss: false,
            message: mess,
            buttons: [
                {
                    text: '知道了',
                    cssClass: 'baocu',
                    handler: () => {
                        this.back()
                        this.router.navigateByUrl("default/renwu/mine");   //跳转
                    }
                }
            ]
        });
        await alert.present();
    }
    back() {
        this.modalCtrl.dismiss();
        console.log('ondidddddddddd');
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
  async open_renwu_update(id,task_id) {
    let con = {
        'tid': task_id,
        'mid':id
    }
    var is_guoqi = true;
    await this.mytasksmodel.getIsGuoqiMyTaskById(con).then(res=>{
        if(res.error != '0'){
            is_guoqi = false;
            alert(res.body);
        }
    });
    if (!is_guoqi) {
        return false;
    }
    const modal = await this.modalCtrl.create(
        {
            component: RenwuUpdatePage,
            componentProps: {
                'id': id,
                'tid': task_id
            }
        }
    );
    modal.onDidDismiss().then( res => {
        this.messageService.message$.subscribe(is_back => this.is_back = is_back);
        console.log(this.is_back, 'this.isback');
        setTimeout(() => {
            if (this.is_back) {
                this.back();
            }
        }, 500);
      });
    await  modal.present();
  }
    showBigImages(i, ti ) {
        this.showBigImageState = true;
        this.big_img_count = this.taskInfo.mytask.my_tt_list[i].img_name.length
        this.big_img = this.img_url + '/' + this.taskInfo.mytask.my_tt_list[i].img_name[ti].img_name
        this.big_img_i = i;
        this.big_img_ti = ti;
    }
    hideBigImage() {
        this.showBigImageState = false;
    }
    swipeEvnet(event) {
        // console.log('进入滑动');
        // 向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            var big_img_ti = this.big_img_ti + 1;
            if (this.taskInfo.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti] ) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.img_url + '/' + this.taskInfo.mytask.my_tt_list[this.big_img_i].img_name[this.big_img_ti].img_name;
            }
        }
        // 向右滑
        if (event.direction == 4) {
            // console.log('进入右滑动');
            var big_img_ti = this.big_img_ti - 1;
            if (this.taskInfo.mytask.my_tt_list[this.big_img_i].img_name[big_img_ti]) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.img_url + '/' + this.taskInfo.mytask.my_tt_list[this.big_img_i].img_name[this.big_img_ti].img_name;
            }
        }
    }
}
