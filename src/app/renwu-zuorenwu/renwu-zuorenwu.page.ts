import { Component, OnInit , OnDestroy , ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { TasksModel, MyTasksModel , ToolsModel , CameraModel , LoginModel , MapModel } from '../model';
import { ConfigModel } from '../model/config.model';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ModalController, NavParams , ToastController} from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {SearchPage} from '../search/search.page';
// import {Search2Page} from '../search2/search2.page';
// import {SearchautoPage} from '../searchauto/searchauto.page';
import {RenwuConPage} from '../renwu-con/renwu-con.page';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs/Subscription';
import {PositionPage} from '../position/position.page';
// import { ChangeDetectorRef } from '@angular/core';
import 'hammerjs';
declare var BMap;
@Component({
  selector: 'app-renwu-zuorenwu',
  templateUrl: './renwu-zuorenwu.page.html',
  styleUrls: ['./renwu-zuorenwu.page.scss'],
})
export class RenwuZuorenwuPage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };
  action: string;
  sub: Subscription;
  id: string;
  tid: string;
  tasksListCon: any;
  dizhi_check: any;
  gongcheng_uploadFileArr: any;
  avatarPath: string;
  fangqiPath: string;
  fangqiedPath: string;
  dizhi_type: string;
  gps_address: any;
  gps_address_x: any;
  gps_address_y: any;
  showBigImageState: boolean;
  big_img: string;
  big_img_ti: number;
  big_img_i: number;
  big_img_count: number;
  yangliImg: boolean;
  user_id: any;
  lingqu_class: string;
  key_item_arr: any;
  key_item_arr_tmp: any;
  gps_id: string;
  mess_two: any;
  on_scene: string;
  formData: any;
  imgDate: any;
  waiting: any;
  data: any; // 控制放弃按钮 放弃后点击事件失效
  is_fangqi: any;
  constructor(
              public toastController: ToastController,
              private cdr: ChangeDetectorRef,
              private messageService: MessageService,
              public route: ActivatedRoute,
              public router: Router,
              public camera: Camera,
              public tasks: TasksModel,
              public mytasks: MyTasksModel,
              public tools: ToolsModel,
              public cameraM: CameraModel,
              public alertController: AlertController,
              private actionSheetController: ActionSheetController,
              public login: LoginModel,
              public geolocation: Geolocation,
              public modalCtrl: ModalController,
              public transfer: FileTransfer,
              public File: File,
              public navParams: NavParams
             ) {
      // this.id = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');
    this.id = this.navParams.get('id');
    this.tid = this.navParams.get('tid');
    this.tasksListCon = [];
    this.gongcheng_uploadFileArr = [];
    this.dizhi_type = '0';
    this.avatarPath = './assets/img/renwu_io_add.png';  // 默认图片
    this.fangqiPath = './assets/img/renwu_io_fangqi.png';  // 默认图片
    this.fangqiedPath = './assets/img/renwu_io_fangqied.png';  // 默认图片
    this.gps_address_x = '';
    this.gps_address_y = '';
    this.gps_address = '';
    this.action = '';
    this.showBigImageState = false;
    this.yangliImg = false;
    this.user_id = '';
    this.lingqu_class = 'lingqu_no';
    this.key_item_arr = new Array();
    this.key_item_arr_tmp = new Array();
    this.mess_two = new Array();
    this.on_scene = '';
    this.gps_id = '';
    this.waiting = '0';
    this.is_fangqi = true; // 调控放弃后恢复
  }
  ngOnInit(): void {
      // 组件B获得消息
      // const a = this.message.getMessage();
      // this.message.sendMessage(5); // 组件B发送消息
      this.messageService.message$.subscribe(action => this.action = action);
      let that = this
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((resp) => {
          // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
          const x = resp.latitude;
          const y = resp.longitude;

          // 百度地图根据位置获取对应的位置中文
          const geocoder = new BMap.Geocoder();
          const point = new BMap.Point(y, x);
          geocoder.getLocation(point,function(geocoderResult,LocationOptions){
              // alert(geocoderResult.address);
              // that.action = geocoderResult.address;
              // that.dizhi_type='1'
          });
      })

      this.login.LoginSession().subscribe(res => {
      let login_info: any = this.tools.decodeUrlList(res);
      if (login_info.error !== '0') {
          this.router.navigateByUrl('/home');
          return;
      } else {
        this.user_id = login_info.body.id;
        this.getTasksCon(this.id);
      }
    }); // 登陆验证
  }
    // ngOnDestroy(): void {
    //     this.sub.unsubscribe();  // 不要忘记取消订阅
    // }
    ionViewDidLeave() {

    }
  /**
   * 获取任务详情
   * @ param id
   */
  getTasksCon(id) {
    // var uid = this.user_id;
    let con = {
      mtid: id,
    }
    this.tasks.getOneMytasksCon(con).subscribe(res => {
        this.tasksListCon = res;
        // console.log(this.tasksListCon, 'this.tasksListCon000');
        console.log(this.tasksListCon, 'this.tasksListCon111bbbbbbbbbbbbbbbbbb');
        this.tasksListCon = this.tools.decodeUrlList(this.tasksListCon.body);
        // 转换为数组
        console.log(this.tasksListCon, 'this.tasksListCon111cccccccccccccccccccc');
        this.setTasksListConTtlistList(this.tasksListCon.tt_list);
        // this.setFangqi_Huifu_TTlist(this.tasksListCon.tt_list)
        console.log(this.tasksListCon, 'tt222222222222222222222');
        // console.log(this.key_item_arr, 'this.key_item_arr,,,,,,,,,,,,,,,,,,,,,,,,,,');
      // this.tasksListCon = this.setTasksListConList(this.tasksListCon);
      if (!this.tasksListCon) {
        this.router.navigate(['/index-tab']);
      }
    });
  }
    async open_position() {
        this.dizhi_type = '1';
        const modal = await this.modalCtrl.create({component: PositionPage });
        modal.onDidDismiss().then( res => {
            this.router.onSameUrlNavigation = 'reload';
        });
        await  modal.present();
    }

  /**
   * 更新tasksListCon.tt_list里面的数据
   * @param tasksListTtCon this.tasksListCon.tt_list
   */
  setTasksListConTtlistList(tasksListTtCon) {
      // console.log(tasksListTtCon, 'tasksListTtCon123');
      // tasksListTtCon 即为this.setTasksListConTtlistList(this.tasksListCon.tt_list);中的this.tasksListCon.tt_list
      for (const o in tasksListTtCon) {
          // o为列表index
          // tt_list 数组中添加字段
          tasksListTtCon[o].img_srcs = [{img_src: this.avatarPath, dis: 1}];
          tasksListTtCon[o].img_fangqi_srcs = [{img_fangqi_src: this.fangqiPath, dis: 1}];
          tasksListTtCon[o].img_fangqied_srcs = [{img_fangqi_src: this.fangqiedPath, dis: 1}];
// 备份一份 为的是点击放弃后 恢复然后重新指向新的备份的图片地址
          tasksListTtCon[o].img_srcs_b = [{img_src: this.avatarPath, dis: 1}];
          tasksListTtCon[o].img_fangqi_srcs_b = [{img_fangqi_src: this.fangqiPath, dis: 1}];
          tasksListTtCon[o].img_fangqied_srcs_b = [{img_fangqi_src: this.fangqiedPath, dis: 1}];

          tasksListTtCon[o].Fangqi_Huifu_mark = '0' ;

        if (tasksListTtCon[o].key_item == '1') {  // 如果是关键项
          this.key_item_arr.push(tasksListTtCon[o].id); // 添加进关键项数组
          this.key_item_arr_tmp.push(tasksListTtCon[o].id);
        }
        if (tasksListTtCon[o].is_gps == '1') { // 是否是定位项 即第六项
          this.gps_id =  tasksListTtCon[o].id;
        }
      }
  }

  setFangqi_Huifu_TTlist_F(tasksListTtCon) {
    for (const o in tasksListTtCon) {
        // o为列表index
        // tt_list 数组中添加字段
        tasksListTtCon.Fangqi_Huifu_mark = '0' ;
    }
  }
    setFangqi_Huifu_TTlist_T(tasksListTtCon) {
        for (const o in tasksListTtCon) {
            // o为列表index
            // tt_list 数组中添加字段
            tasksListTtCon.Fangqi_Huifu_mark = '1' ;
        }
    }
  /**
   * 展示弹窗
   * @param i 分项建
   * @param ti 图片建
   */
  showPaizhaoOrxc(i, ti) {
    if (this.tasksListCon.tt_list[i].img_srcs[ti].img_src != this.avatarPath) {
      this.showBigImage(i, ti );
      return;
    }
    this.presentActionSheet( i, ti );
  }

  /**
   * 放弃分项
   * @param i 分项键
   */
  async presentToast( msg ) {
      const toast = await this.toastController.create({
          message: msg,
          duration: 1000,
          position: 'middle',
      });
      toast.present();
  }
  async gongcheng_img_fangqi(i) {
      // 这种无法控制单个，整体失效
      if ( this.tasksListCon.tt_list[i].Fangqi_Huifu_mark == '0') {
          const alert = await this.alertController.create({
              backdropDismiss: false,
              header: '确定放弃此项吗?',
              cssClass: 'gongsi',
              buttons: [
                  {
                      text: '取消',
                      role: 'cancel',
                      cssClass: 'primary',
                      handler: () => {
                          console.log('Confirm Cancel');
                          // this.modalCtrl.dismiss();
                      }
                  }, {
                      text: '确定',
                      cssClass: 'sure',
                      handler: (value) => {
                          this.tasksListCon.tt_list[i].img_srcs = [];  // +置空
                          this.tasksListCon.tt_list[i].img_fangqi_srcs = this.tasksListCon.tt_list[i].img_fangqied_srcs;  // 换为已放弃图片
                          console.log(JSON.stringify(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id]), '111')
                          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined) {
                              // 上来不添加照片 直接放弃走这里
                              this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
                              // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = []; // 将添加过的照片清空
                              console.log(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id], '222');
                              this.cdr.markForCheck();
                              this.cdr.detectChanges();
                              // this.onTixing_zhang('undefined');
                          }
                            // 正常添加图片后再放弃 下面都走
                          if ( this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length > 0 ) {
                              console.log('sss');
                              // 如果已经添加了照片且如果该项是必填项的话 前面的逻辑已经将必填项移出递归数组 [13 39 40](少了其中一个) ，那么
                              // 此时需要将该项重新填进递归数组，否则按钮也是红的
                              this.get_key_item(this.tasksListCon.tt_list[i].id, '2'); // 验证必填项
                              this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = []; // 将添加过的照片清空
                              this.tasksListCon.tt_list[i].img_srcs = [];  // +置空
                              this.cdr.markForCheck();
                              this.cdr.detectChanges();
                              // this.onTixing_zhang('length > 0 ');
                          }
                          //  JSON.stringify(this.gongcheng_uploadFileArr)
                          this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = []; // 将添加过的照片清空
                          console.log(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id], '333');
                          this.tasksListCon.tt_list[i].img_srcs = [];  // +置空
                          this.cdr.markForCheck();
                          this.cdr.detectChanges();
                          // this.onTixing_zhang('sss');
                          // this.get_key_item(this.tasksListCon.tt_list[i].id, ''); // 验证必填项
                          // console.log(this.tasksListCon.tt_list[i].img_srcs, 'con');
                          // document.getElementById('btn').remove(); // 执行后可以直接移除它，但是也就没有了'已放弃'
                          // this.is_fangqi = false;
                          this.setFangqi_Huifu_TTlist_T(this.tasksListCon.tt_list[i]);
                          console.log(this.tasksListCon, 'tt333333333333333333333333333');

                      }
                  }
              ]
          });
          // return await
          // alert.present();
          await alert.present();
      } else {
          // alert('123');
          const alert = await this.alertController.create({
              backdropDismiss: false,
              header: '需要恢复此项吗?',
              cssClass: 'gongsi',
              buttons: [
                  {
                      text: '取消',
                      role: 'cancel',
                      cssClass: 'primary',
                      handler: () => {
                          console.log('Confirm Cancel');
                          // this.modalCtrl.dismiss();
                      }
                  }, {
                      text: '确定',
                      cssClass: 'sure',
                      handler: (value) => {
                          // this.getTasksCon(this.id);
                          // this.tasksListCon.tt_list[i].img_srcs  = []
                          // document.getElementById('btn').remove(); // 执行后可以直接移除它，但是也就没有了'已放弃'
                          // this.tasksListCon.tt_list[i].img_srcs  = []
                          this.tasksListCon.tt_list[i].img_srcs.push({img_src: this.avatarPath, dis: 1}); // 增加一个默认图片
                          // this.tasksListCon.tt_list[i].img_srcs = this.tasksListCon.tt_list[i].img_srcs_b ;
                          this.tasksListCon.tt_list[i].img_fangqi_srcs = this.tasksListCon.tt_list[i].img_fangqi_srcs_b
                          console.log(this.tasksListCon.tt_list[i].img_srcs_b, 'this.tasksListCon.tt_list[i].img_srcs_b');
                          // 不会上来就点恢复，所以此无用
                          // if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined) {
                          //     // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
                          //     this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = []; // 将添加过的照片清空
                          //     console.log(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id], '222');
                          //     this.onTixing_zhang('undefined');
                          // }
                          // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = []; // 将添加过的照片清空
                          // this.onTixing_zhang('恢复');
                          // console.log(this.tasksListCon.tt_list[i].img_srcs, 'this.tasksListCon.tt_list[i].img_srcs');
                          this.cdr.markForCheck();
                          this.cdr.detectChanges();
                          // document.getElementById('btn').remove(); //执行后可以直接移除它，但是也就没有了'已放弃'
                          this.get_key_item(this.tasksListCon.tt_list[i].id, ''); // 验证必填项
                          this.setFangqi_Huifu_TTlist_F(this.tasksListCon.tt_list[i]);
                          console.log(this.tasksListCon, 'tt333333333333333333333333333');

                      }
                  }
              ]
          });
          // return await
          // alert.present();
          await alert.present();
      }
  }
  // async is_fangqi(i) {
  //     const alert = await this.alertController.create({
  //         header: '需要恢复此项吗',
  //         cssClass: 'gongsi',
  //         // inputs: [
  //         //     {
  //         //         name: 'name1',
  //         //         type: 'text',
  //         //         placeholder: '请输入公司名称！',
  //         //     }
  //         // ],
  //         buttons: [
  //             {
  //                 text: '取消',
  //                 role: 'cancel',
  //                 cssClass: 'primary',
  //                 handler: () => {
  //                     console.log('Confirm Cancel');
  //                     // this.modalCtrl.dismiss();
  //                 }
  //             }, {
  //                 text: '确定',
  //                 cssClass: 'sure',
  //                 handler: (value) => {
  //                     this.tasksListCon.tt_list[i].img_srcs = this.tasksListCon.tt_list[i].img_srcs;
  //                     this.tasksListCon.tt_list[i].img_fangqi_srcs = this.tasksListCon.tt_list[i].img_fangqi_srcs
  //                     this.get_key_item(this.tasksListCon.tt_list[i].id, '2');
  //                     this.cdr.markForCheck();
  //                     this.cdr.detectChanges();
  //                     // document.getElementById('btn').remove(); //执行后可以直接移除它，但是也就没有了'已放弃'
  //                     // document.getElementById('btn').click = null;
  //                     this.data = true ;
  //                 }
  //             }
  //         ]
  //     });
  //     // return await
  //     // alert.present();
  //     await alert.present();
  // }


    async onTixing(mess, type = '') {
    const alert = await this.alertController.create( {
      backdropDismiss: false,
      message: mess,
      buttons: [
          // {
          //     text: '',
          //     // cssClass: 'primary',
          //     handler: () => {
          //         // this.router.navigateByUrl("default/");   // 跳转
          //     }
          // },
          {
            text: '知道了',
            cssClass: 'baocu',
            handler: () => {
              if ( type == '1') {
                  this.back()
                  this.router.navigateByUrl('default/renwu/mine');   // 跳转
              } else {
                  this.back();
              }
            }
          }
      ]
    });
    await alert.present();
  }




    async onTixing_zhang(mess, type = '') {
      // 上传照片张数限制提示
        const alert = await this.alertController.create( {
            backdropDismiss: false,
            message: mess,
            buttons: [
                {
                    text: '知道了',
                    cssClass: 'baocu',
                    handler: () => {

                    }
                }
            ]
        });
        await alert.present();
    }
    async onTixing_noimg(mess, type = '') {
        const alert = await this.alertController.create( {
            backdropDismiss: false,
            message: mess,
            buttons: [
                {
                    text: '返回上一页',
                    cssClass: 'primary',
                    handler: () => {
                        this.back()
                        // this.router.navigateByUrl("default/");   // 跳转
                    }
                },
                {
                    text: '继续做任务',
                    cssClass: 'sure',
                    handler: () => {
                        if ( type == '1') {
                            this.modalCtrl.dismiss();
                        } else {
                            // this.back()
                            // this.router.navigateByUrl("default/renwu/mine");   //跳转
                        }
                    }
                }
            ]
        });
        await alert.present();
    }
    async onTixing_wait(mess, type = '') {
        const alert = await this.alertController.create( {
            backdropDismiss: false,
            message: mess,
            buttons: [
                {
                    text: '知道了',
                    cssClass: 'baocu',
                    handler: () => {
                    }
                }
            ]
        });
        await alert.present();
    }
  /**
   * 做任务 提交 第一步验证是否有项是空 第二步验证是否有项 未达到最少图片上传
   * @ param mess
   * @ param button_one
   * @ param button_two
   * @param type 第几部
   */
  async presentAlertConfirm( mess, button_one, button_two, type) {
    if (mess == '' || mess == '[]' || mess == undefined) {
      // console.log('提交成功');
      this.photo_submit_tmp();
      // this.router.navigateByUrl("default/renwu/mine");   //跳转
      return;
    }
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: mess,
      buttons: [
        {
          text: button_one,
          role: 'cancel',
          // cssClass: 'secondary',
          cssClass: 'primary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            return;
          }
        }, {
          text: button_two,
          cssClass: 'sure',
          handler: () => {
            if ( type == '1' && this.mess_two != "[]" ) {
              this.presentAlertConfirm(this.mess_two.shift(), '返回去拍照', '知道了，继续提交', '2');
              return;
            } else {
              if (this.mess_two == '[]' || this.mess_two == '' || this.mess_two.length == '0') {
                // console.log('提交成功');
                this.photo_submit_tmp();
                  // this.router.navigateByUrl("default/renwu/mine");   //跳转
                return;
              } else {
                this.presentAlertConfirm(this.mess_two.shift(), '返回去拍照', '知道了，继续提交', '2');
                  // this.router.navigateByUrl("default/renwu/mine");   //跳转
                return;
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }
  /**
   * 弹窗方法
   * @ param type
   * @ param index
   */
  async presentActionSheet( i, ti ) {
    // console.log(i,ti,'i  ti');
    const actionSheet = await this.actionSheetController.create({
      header: '选择上传方式',
      buttons: [{
        text: '拍照上传',
        icon: 'share',
        handler: () => {
          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined) {
            this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
          }
          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length  == this.tasksListCon.tt_list[i].max) {
              this.onTixing_zhang('此项最多张数为' + this.tasksListCon.tt_list[i].max + '张');
              return;
          }
            // if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[1].id]  || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[2].id] || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[3].id]) {
            //     this.lingqu_class = 'lingqu';
            // } else {
            //     this.lingqu_class = 'lingqu_no';
            // }

          this.cameraM.getPicModel(100, 0, 0, 0, true,1,1024,1024).then((imageData) => {
              this.setImgTypeUrl(i, ti, imageData);
              this.imgDate.push(imageData) ;
          }, (err) => {
            // Handle error
          });
        }
      }, {
        text: '从相册选取上传',
        icon: 'share',
        handler: () => {
          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined){
            this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
              // console.log(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id],'sdfadsfasdfasdfasdfasdf');
          }
          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length  == this.tasksListCon.tt_list[i].max){
              this.onTixing_zhang('此项最多张数为' + this.tasksListCon.tt_list[i].max + '张');
              return;
          }
          this.cameraM.getPicModel(100, 0, 0, 0, false, 0, 1024, 1024).then((imageData) => {
            this.setImgTypeUrl(i, ti , imageData);
          }, (err) => {
            // Handle error
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
    await actionSheet.present();
  }
  /**
   * 拍照成功或相册选取照片成功 设置对应的src
   * @param i 分项建
   * @param ti 图片键
   */
  setImgTypeUrl(i, ti, imageData) {
      // console.log(imageData,'imageData');
      // this.tasksListCon.tt_list[i].img_srcs = new Array()
      // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = [];

      this.tasksListCon.tt_list[i].img_srcs[ti].img_src = 'data:image/jpeg;base64,' + imageData ; // 给原有默认图片 改为上传的图片
    // this.tasksListCon.tt_list[i].img_srcs[ti].img_src = imageData; //给原有默认图片 改为上传的图片
      this.tasksListCon.tt_list[i].img_srcs[ti].dis = 0;
      this.tasksListCon.tt_list[i].img_srcs.push({img_src: this.avatarPath, dis: 1}); // 增加一个默认图片
    // console.log(this.tasksListCon.tt_list);
    if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined) {
      this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
    }
      // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
      this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].push({img_src: 'data:image/jpeg;base64,' + imageData});
    // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].push({img_src:imageData});

    // 验证是否是关键项
      this.get_key_item(this.tasksListCon.tt_list[i].id, '1'); // 是的话，把key_item_arr减少一个
  }

  /**
   * 删除一个图片
   * @ param i
   * @ param ti
   */
  deleteImgOne( i, ti ) {
    this.tasksListCon.tt_list[i].img_srcs.splice(ti, 1);
    this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].splice(ti, 1 );
    if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length == 0) {
        // 如果单项删完了所有照片，那么就把此项列入递归验证必填项
      this.get_key_item(this.tasksListCon.tt_list[i].id, '2');
    }
  }
  photo_submit() {
    if ( JSON.stringify(this.gongcheng_uploadFileArr) == '[]' || this.lingqu_class == 'lingqu_no' ) {
      this.onTixing_noimg('没有上传图片');
      return;
    } else if (this.waiting == 1 ) {
        this.onTixing_wait('任务正在提交，请稍等..');
        return;
    } else if (this.waiting != 1) {
        this.submit_controler();
    }

    // this.router.navigateByUrl("default/renwu/mine");   //跳转
  }
  submit_controler() {
    let i = 0;
    let oi = 0;
    let mess = '';
    this.mess_two = new Array();
    for ( const o in this.tasksListCon.tt_list) {
        i++;
        if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == undefined || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == '[]' || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == '') {
            if (this.tasksListCon.tt_list[o].is_gps != '1') { // 不是第六项地理项
                if (oi == 0) {
                  mess = '第' + i;
                } else {
                  mess = mess + '、' + i;
                }
                oi++;
            }
        } else {
          // console.log('进入至少存入');
          // console.log(this.tasksListCon.tt_list[o].id);
          if (this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id].length < this.tasksListCon.tt_list[o].min) {
            this.mess_two.push(this.tasksListCon.tt_list[o].name + '照片至少' + this.tasksListCon.tt_list[o].min + '张，您当前上传' + this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id].length + '张，提交后该项无奖励。');
          }
        }
    }
    if ( mess != '') {
      mess = mess + '项无内容，点击继续提交，默认您放弃提交该项数据。';
      this.presentAlertConfirm(mess, '取消', '继续提交', '1');
      return;
    } else {
      this.presentAlertConfirm(this.mess_two.shift(), '返回去拍照', '知道了，继续提交', '2');
      return;
    }
  }
  getBlob(b64Data) {
  let contentType = 'image/png';
  let sliceSize = 1024;

  b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

  let byteCharacters = atob(b64Data); // decode base64
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, {type: contentType});
  return blob;
 }
  readerFile( imageURI, o, i ) {
    var that = this;
    // if (!imageURI.startsWith('file://')) {
    //   imageURI = 'file://' + imageURI;
    // }
    let blobfile = this.getBlob(imageURI);
    that.formData.append('files' + '[' + o + '][' + i + ']', blobfile, 'images.jpg');
      // this.File.resolveLocalFilesystemUrl(imageURI).then(function(fileEntry:any){
      //   fileEntry.file(function(fileresult) {
      //       var reader = new FileReader();
      //       console.log('3333333333333');
      //       reader.onloadend = function(e:any) {
      //           var the_file = new Blob([e.target.result ], { type: "image/jpeg" } );
      //           // that.formData.append("files"+"_"+o, the_file);
      //           that.formData.append("files"+"_"+o, the_file,"images.jpg");
      //           // //存储图片二进制流
      //           // that.ImageFileList.push(the_file);
      //           // console.log(that.ImageFileList);
      //           // //存储图片地址用于预览
      //           // that.ImageURIList.push(imageURI);
      //           // console.log(that.ImageURIList);
      //       };
      //       reader.readAsArrayBuffer(fileresult);
      //   });
      // });
  }
    locationTo() {
        this.dizhi_check = '1';
    }
  /**
   * 提交 处理数据
   */
  photo_submit_tmp() {
    this.lingqu_class = 'lingqu_no';
    this.waiting = 1
    this.formData = new FormData();
    for ( const o in this.gongcheng_uploadFileArr) {
      if (this.gongcheng_uploadFileArr[ o ]) {
        for ( const i in this.gongcheng_uploadFileArr[ o ]) {
          this.readerFile(this.gongcheng_uploadFileArr[ o ][ i ].img_src, o , i );
          // 直接存base64
          // this.formData.append("files"+"_"+o, this.gongcheng_uploadFileArr[o][i].img_src,"images.jpg");
        }
      }
      // this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);
    }
    this.formData.append('my_task_id', this.id);
    this.formData.append('lon', this.gps_address_x);
    this.formData.append('lat', this.gps_address_y);
    // this.formData.append("address",this.gps_address); 参数this.gps_address 换为this.action
    this.formData.append('address', this.action);
    this.formData.append('on_scene', this.on_scene);
    this.formData.append('gps_id',  this.gps_id);
    this.formData.append('task_id', this.tid);
    this.formData.append('action', 2);
    this.formData.append('filename', 'files');
    this.tasks.uploads(this.formData).subscribe(res => {
      console.log(res);
        if (res) {
            this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）', '1' );
        }
    });
      // this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）', '1' );
    // this.router.navigateByUrl('/index');
    // this.router.navigateByUrl('default/renwu/mine');   // 跳转
    // window.location.reload();
    // return ;
      // 修改my_task表中的经纬度
      // let my_task_update_data = {
      //   my_task_id: this.id,
      //   lon: this.gps_address_x,
      //   lat: this.gps_address_y,
      //   address:this.gps_address,
      //   on_scene:this.on_scene
      //   };
        // this.mytasks.updateMyTask(my_task_update_data).subscribe(res => {
      //     let action_records = {
      //       task_id:this.tid,
      //       my_task_id:this.id,
      //       lon:this.gps_address_x,
      //       lat:this.gps_address_y,
      //       action:'2',
      //       //user_id:this.user_id
      //     };
      //     this.tasks.insertTaskActionRecords(action_records).subscribe(res => {
      //         let ress:any = this.tools.decodeUrlList(res);
      //         if(ress.error == '0'){
      //           let in_ta_ac_id = ress.body;
      //           for(var o in this.gongcheng_uploadFileArr){
      //             console.log(this.gongcheng_uploadFileArr[o]);
      //             let gongcheng_params = {
      //               //user_id:this.user_id,
      //               task_id:this.tid,
      //               my_task_id:this.id,
      //               task_item_id:o,
      //               filename:'gongcheng',
      //               in_ta_ac_id:in_ta_ac_id
      //               };
      //             this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);
      //             let gongcheng_my_task_items_params = {
      //               my_task_id:this.id,
      //               task_item_id:o,
      //               user_id:this.user_id,
      //               photo_amount:this.gongcheng_uploadFileArr[o].length,
      //               task_action_records_id:in_ta_ac_id,
      //            };
                //  this.tasks.insertMyTaskItems(gongcheng_my_task_items_params).subscribe(res => {
      //              console.log(res);
      //            })
      //           }
      //         }
      //     });
      //   })
      // this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）');
      // this.router.navigateByUrl('/index');
  }
  /**
   * 验证必填项 是否已经填写
   */
  get_key_item( id, type) {
      if (type == '1') { // 添加图片 移除数组锁定
        for ( let o in this.key_item_arr) {
          if (id == this.key_item_arr[o]) {
              // console.log( o , 'oooooooooooooooooooooooooooooooooooooooo' );
              // this.lingqu_class = 'lingqu';
              this.key_item_arr.splice( o , 1 );
          }
        }
      }
      if (type == '3') { // 添加图片 移除数组锁定
          for ( let o in this.key_item_arr) {
              this.key_item_arr.splice( 2 , 1 );
              // if (id == this.key_item_arr[o]) {
              //     // console.log( o , 'oooooooooooooooooooooooooooooooooooooooo' );
              //     // this.lingqu_class = 'lingqu';
              //     this.key_item_arr.splice( o , 1 );
              // }
          }
      }
      if (type == '2') { // 删除图片
          let state = false;
          for (let o in this.key_item_arr_tmp) {
            if ( id == this.key_item_arr_tmp[o]) {
              state = true;
            }
          }
          if (state) {
            this.key_item_arr.push(id);
          }
      }
      console.log(this.key_item_arr, 'this.key_item_arr9999999999999999999999999999999999');
      if (this.key_item_arr.length == 0 || this.key_item_arr.length == 2 || this.key_item_arr.length == 1) {
        this.lingqu_class = 'lingqu';
      } else {
        this.lingqu_class = 'lingqu_no';
      }
      // console.log(this.key_item_arr_tmp);
      // console.log(this.key_item_arr,'key_item_arr');
    }
    /*
    * 不在现场*/
  /*
   * 在现场获取地理位置
   */
    open_dizhi_list() {
        this.dizhi_type = '10';
    }
    dingwei() {
        this.dizhi_type = '1';
        this.action = '' ;
    }
    async open_search() {
        this.dizhi_type = '1';
        // this.dizhi_check='1'
        this.gps_address = '';
        const modal = await this.modalCtrl.create({component: SearchPage });
        modal.onDidDismiss().then( res => {
            this.router.onSameUrlNavigation = 'reload';
            // let selTab = this.tabRef.getSelected();
            // this.router.navigateByUrl('/default/renwu/'+selTab);
        });

        await  modal.present();
    }

// 拉取授权gps
 async onGpsTo() {
    this.on_scene = '1';
    this.dizhi_type = '1';
      let geolocation = new BMap.Geolocation();
      await geolocation.getCurrentPosition((resp) => {  // 获取经纬度
           // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
          let x = resp.latitude;
          let y = resp.longitude;
         // let X = parseFloat(resp.latitude) - parseFloat('0.0056225')
         // let Y = parseFloat(resp.longitude) + parseFloat('0.083662')
         this.gps_address_x = x;
         this.gps_address_y = y;
         this.zh_chinese( x , y);
        });
    }
    zh_chinese( x, y ) {
        let that = this
        // 百度地图根据经纬度位置获取对应的位置中文
        let geocoder = new BMap.Geocoder();
        let point = new BMap.Point( y, x );
        geocoder.getLocation(point,function(geocoderResult) {
            // that.gps_address = geocoderResult.address;  参数this.address 换为this.action
           let  addComp = geocoderResult.addressComponents;
           that.action = addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber;
            // 解决层叠获取action后，页面未能及时刷新，--
           that.cdr.markForCheck();
           that.cdr.detectChanges();
        });
    }

    // onGpsTo1(){
    //     this.on_scene = '1';
    //     this.dizhi_type = '1';
    //     var geoc = new BMap.Geocoder();
    //     console.log(geoc,'9999999999999999999999999');
    //     geoc.getLocation(pt, function(rs){
    //         var addComp = rs.addressComponents;
    //         alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
    //     });
    // }
// gps_play_shouquan(){
// gps_play_shouquan(){
//     this.geolocation.getCurrentPosition().then((resp) => {
//       console.log(resp,'resp');
//       this.get_address_bybaidumap_shouquan(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000);
// }).catch((error) => {
//     console.log(error);
//    });
// }
/**
 *
 * @param x 授权获取百度地图具体位置
 * @ param y*/
// get_address_bybaidumap_shouquan(x,y){
//   this.gps_address_x = x;
//   this.gps_address_y = y;
//     let that = this;
//   //原始GPS坐标转为百度坐标
//   var myGeo = new BMap.Geocoder();
//   var baiduPoint = new BMap.Point(y,x);
//
//     myGeo.getLocation(baiduPoint,function(myGeoResult,LocationOptions){
//         alert(myGeoResult.address);
//         console.log(myGeoResult,'geocoderResult');
//         if(result){
//         that.dizhi_type = '1';
//           console.log('11111111');
//           that.gps_address = result.address;
//           that.get_key_item(that.gps_id,'1');
//       }else{
//         return 'err';
//       }
//   });
// }

  hideBigImage() {
    this.showBigImageState = false;
  }

  showBigImage( i, ti ) {
    this.big_img_count = this.tasksListCon.tt_list[i].img_srcs.length - 1;
    this.big_img = this.tasksListCon.tt_list[i].img_srcs[ti].img_src;
    this.big_img_i = i;
    this.big_img_ti = ti;
    this.yangliImg = false;
    this.showBigImageState = true;
  }

  /*查看样例* @ param i*/
  yangliImgOne(i) {
    this.big_img_ti = 0;
    // this.big_img_count = 1;
      // 若是想要样例只显示第一张不轮播，则注释掉下面两行开启上面一行，换掉seipeEvnet函数
    this.big_img_i = i;
    this.big_img_count = this.tasksListCon.tt_list[i].img_name.length;
    // console.log(this.big_img_count,'this.big_img_count');
    this.big_img = this.tasksListCon.tt_list[i].img_name[0];
    // console.log(this.tasksListCon.tt_list[i], ' this.tasksListCon.tt_list[i]');
    this.yangliImg = true;
    this.showBigImageState = true;
  }

    swipeEvnet(event) {
        // console.log('进入滑动');
        // 向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            const big_img_ti = this.big_img_ti + 1;
            if (this.tasksListCon.tt_list[this.big_img_i].img_name[big_img_ti] ) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_name[this.big_img_ti];
            }
        }
        // 向右滑
        if (event.direction == 4) {
            // console.log('进入右滑动');
            const big_img_ti = this.big_img_ti - 1;
            // console.log(this.tasksListCon.tt_list[this.big_img_i].img_name[big_img_ti]);
            if(this.tasksListCon.tt_list[this.big_img_i].img_name[big_img_ti]) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_name[this.big_img_ti];
            }
        }
    }

    // swipeEvnet(event){
    //   console.log('进入滑动');
    // 是样例则不走
    // if(this.yangliImg){
    //   return;
    // }
    //   //向左滑
    //   if (event.direction == 2) {
    //       console.log('进入左滑动');
    //
    //       var big_img_ti = this.big_img_ti+1;
    //       if(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
    //         this.big_img_ti = big_img_ti;
    //         this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_srcs[this.big_img_ti].img_src;
    //       }
    //   }
    //
    //   //向右滑
    //   if (event.direction == 4) {
    //       console.log('进入左滑动');
    //       var big_img_ti = this.big_img_ti-1;
    //       console.log(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src);
    //       if(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
    //         this.big_img_ti = big_img_ti;
    //         this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_srcs[this.big_img_ti].img_src;
    //       }
    //   }
    // }
  back() {
   this.modalCtrl.dismiss();
  }

  async open_con( tid, status ) {
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
