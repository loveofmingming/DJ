import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsModel, MyTasksModel, TasksModel, CameraModel, LoginModel} from '../model';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ConfigModel } from '../model/config.model';
import { ModalController, NavParams } from '@ionic/angular';

import {SearchPage} from '../search/search.page';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs/Subscription';
import {PositionPage} from '../position/position.page';
import 'hammerjs';
declare var BMap;
@Component({
  selector: 'app-renwu-update',
  templateUrl: './renwu-update.page.html',
  styleUrls: ['./renwu-update.page.scss'],
})
export class RenwuUpdatePage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    on_scene: string;
    action: string;
    sub: Subscription;
    taskInfo: any;
    mid: string;
    tid: any;
    user_id: any;
    avatarPath: string;
    fangqiPath: string;
    fangqiedPath: string;
    gongcheng_uploadFileArr: any;
    test: string;
    my_task_item_id_arr: any;
    dizhi_type: string;
    gps_address: string;
    gps_address_x: any;
    gps_address_y: any;
    showBigImageState: boolean;
    big_img: string;
    big_img_ti:number;
    big_img_i:number;
    big_img_count:number;
    yangliImg:boolean;
    formData:any;
    gps_id:string;
    old_task_action_records_zj_id:string;
    key_item_arr: any;
    key_item_arr_tmp: any;
    is_back: any;
    is_fangqi: any;
  constructor(
      private cdr: ChangeDetectorRef,
      private messageService: MessageService,
      public toolsmodel: ToolsModel,
      public mytasksmodel: MyTasksModel,
      public tasks: TasksModel,
      public route: ActivatedRoute,
      public router: Router,
      public cameraM: CameraModel,
      private actionSheetController: ActionSheetController,
      private alertController: AlertController,
      public geolocation: Geolocation,
      public loginmodel: LoginModel,
      public modalCtrl: ModalController,
      public navParams: NavParams
  ) {
    // this.mid = this.route.snapshot.paramMap.get('mid');
    // this.tid = this.route.snapshot.paramMap.get('tid');
    this.mid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');
    this.taskInfo = [];
    this.user_id = '';
    this.avatarPath = './assets/img/renwu_io_add.png'; // 默认图片
    this.fangqiPath = './assets/img/renwu_io_fangqi.png';  // 默认图片
    this.fangqiedPath = './assets/img/renwu_io_fangqied.png';  // 默认图片
    this.gongcheng_uploadFileArr = [];
    this.my_task_item_id_arr = [];
    this.dizhi_type = '1';
    this.gps_address = '';
    this.action = '';  // 若未上传地址，默认上传''，后台即不显示undefined
    this.gps_address_x = '';
    this.gps_address_y = '';
    this.showBigImageState = false;
    this.yangliImg = false;
    this.on_scene = '';
    this.gps_id = '';
    this.key_item_arr = new Array();
    this.key_item_arr_tmp = new Array();
    this.is_fangqi = true; // 调控放弃后恢复
  }

  ngOnInit(): void {
      this.messageService.message$.subscribe(action => this.action = action);
      console.log(this.action, 'this.actioninittttttttttttt');
        this.loginmodel.LoginSession().subscribe(res => {
        let login_info:any = this.toolsmodel.decodeUrlList(res);
        if (login_info.error != '0') {
            this.router.navigateByUrl('/home');
            return;
        } else {
            this.user_id = login_info.body.id;
            this.getUpdateInfoById(this.tid, this.mid);
        }
        }); // 登陆验证
  }
  getUpdateInfoById(tid, mid) {
      const con = {
          tid: tid,
          mid: mid
      }
      this.mytasksmodel.getInfoMyTaskById(con).subscribe(res => {
          const ress: any = this.toolsmodel.decodeUrlList(res);
          if (ress.error == '0') {
            this.taskInfo = ress.body;
            console.log(this.taskInfo, 'this.taskInfo.2222222222222222222222222');
            this.setTasksListConTtlistList(this.taskInfo.mytask.my_tt_list);
          } else {
            alert(ress.body);
          }
      });
      // console.log(this.taskInfo.mytask.my_tt_list,'this.taskInfo.mytask.my_tt_list');
  }
  setTasksListConTtlistList(tasksListTtCon) {
    this.old_task_action_records_zj_id = this.taskInfo.mytask.task_action_records_zj_id;
      for (const o in tasksListTtCon) {
          tasksListTtCon[o].img_srcs = [{img_src: this.avatarPath, dis: 1}];
          tasksListTtCon[o].img_fangqi_srcs = [{img_fangqi_src: this.fangqiPath, dis: 1}];
          tasksListTtCon[o].img_fangqied_srcs = [{img_fangqi_src: this.fangqiedPath, dis: 1}];
          // 备份一份 为的是点击放弃后 恢复然后重新指向新的备份的图片地址
          tasksListTtCon[o].img_srcs_b = [{img_src: this.avatarPath, dis: 1}];
          tasksListTtCon[o].img_fangqi_srcs_b = [{img_fangqi_src: this.fangqiPath, dis: 1}];
          tasksListTtCon[o].img_fangqied_srcs_b = [{img_fangqi_src: this.fangqiedPath, dis: 1}];
          if (tasksListTtCon[o].is_gps == '1') {   // 是否是定位项 即第六项
            this.gps_id =  tasksListTtCon[o].id;
          }
          if (tasksListTtCon[o].key_item == '1') {   // 如果是关键项
              this.key_item_arr.push(tasksListTtCon[o].id);   // 添加进关键项数组
              this.key_item_arr_tmp.push(tasksListTtCon[o].id);
          }
      }
  }

  showPaizhaoOrxc(i, ti) {
      if ( this.taskInfo.mytask.my_tt_list[i].img_srcs[ti].img_src != this.avatarPath) {
        this.showBigImage(i, ti);
        return;
      }
      this.presentActionSheet(i, ti);
  }
   /**
   * 删除一个图片
   * @ param i
   * @ param ti
   */
  deleteImgOne(i, ti) {
    // console.log('deleteImgOne start');
    // console.log(this.taskInfo.mytask.my_tt_list[i].img_srcs);
    // console.log(this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id]);
    // console.log('deleteImgOne  start');
    this.taskInfo.mytask.my_tt_list[i].img_srcs.splice(ti, 1);
    this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id].splice(ti, 1);
    // console.log('deleteImgOne');
    // console.log(this.taskInfo.mytask.my_tt_list[i].img_srcs);
    // console.log(this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id]);
    // console.log('deleteImgOne');
  }
   /**
   * 弹窗方法
   * @ param type
   * @ param index
   */
  async presentActionSheet(i, ti) {
      // console.log(i, ti);
      const actionSheet = await this.actionSheetController.create({
          header: '选择上传方式',
          buttons: [{
              text: '拍照上传',
              icon: 'share',
              handler: () => {
                this.cameraM.getPicModel(100, 0, 0, 0, true, 1, 120, 120).then((imageData) => {
                    this.setImgTypeUrl(i, ti, imageData);
                }, (err) => {
                    // Handle error
                });
              }
          }, {
              text: '从相册选取上传',
              icon: 'share',
              handler: () => {
                  this.cameraM.getPicModel(100, 0, 0, 0, false, 0, 120, 120).then((imageData) => {
                      this.setImgTypeUrl(i, ti, imageData);
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
      // console.log(this.taskInfo.mytask.my_tt_list[i].img_srcs[ti],'this.taskInfo.mytask.my_tt_list[i].img_srcs[ti]');
      this.taskInfo.mytask.my_tt_list[i].img_srcs[ti].img_src = 'data:image/jpeg;base64,' + imageData; // 给原有默认图片 改为上传的图片
      this.taskInfo.mytask.my_tt_list[i].img_srcs[ti].dis = 0;
      this.taskInfo.mytask.my_tt_list[i].img_srcs.push({img_src: this.avatarPath, dis: 1}); // 增加一个默认图片
      // console.log(this.taskInfo.mytask.my_tt_list);
      // if (this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] == undefined) {
      //   this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = new Array();
      // }
      // this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id].push({img_src:"data:image/jpeg;base64,"+imageData});
      /*************************** 修改为放my_task_item的id **************************/
      if (this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] == undefined) {
          this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = new Array();
      }
      this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id].push({img_src: 'data:image/jpeg;base64,' + imageData});
      this.my_task_item_id_arr[this.taskInfo.mytask.my_tt_list[i].id] = this.taskInfo.mytask.my_tt_list[i]['my_task_items'].id;
  }
  async onTixing(mess, type = '') {
      const alert = await this.alertController.create( {
          backdropDismiss: false,
          message: mess,
          buttons: [
              {
                  text: '知道了',
                  cssClass: 'baocu',
                  handler: () => {
                      // console.log('知道了');
                      // this.is_back = true;
                      // this.messageService.messageAction(this.is_back);
                      // console.log(this.is_back,'chufa');
                      // this.back();
                      if ( type == '1') {
                          this.is_back = true;
                          this.messageService.messageAction(this.is_back);
                          this.back();
                          // console.log(this.is_back, 'chufa');
                      }
                  }
              }],
          // enableBackdropDismiss: false,
      });
      await alert.present();
  }
  readerFile(imageURI, o, i) {
    const that = this;
    const blobfile = this.getBlob(imageURI);
    that.formData.append('files' + '[' + o + '][' + i + ']' , blobfile, 'images.jpg');
  }
  getBlob(b64Data) {
    const contentType = 'image/png';
    const sliceSize = 1024;
    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
    const byteCharacters = atob(b64Data); // decode base64
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
   }
  photo_submit(i) {
      // this.upload(); // 修改页不做限制
    if (JSON.stringify(this.gongcheng_uploadFileArr) == '[]' && this.taskInfo.mytask.my_tt_list.length > 1) {
        this.onTixing('没有上传图片');
    } else {
      this.upload();
    }
}
   upload() {
    this.formData = new FormData();
    // console.log(this.gongcheng_uploadFileArr);
    for ( const o in this.gongcheng_uploadFileArr) {
        if (this.gongcheng_uploadFileArr[o]) {
            for ( const i in this.gongcheng_uploadFileArr[o]) {
                this.readerFile(this.gongcheng_uploadFileArr[o][i].img_src, o , i );
                // 直接存base64
                // this.formData.append("files"+"_"+o, this.gongcheng_uploadFileArr[o][i].img_src,"images.jpg");
            }
        }
        // this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);
    }
    this.formData.append('my_task_id', this.mid);
    this.formData.append('lon', this.gps_address_x);
    this.formData.append('lat', this.gps_address_y);
    this.formData.append('address', this.action);
    this.formData.append('on_scene', this.on_scene);
    this.formData.append('gps_id', this.gps_id);
    this.formData.append('old_task_action_records_zj_id', this.old_task_action_records_zj_id);
    this.formData.append('task_id', this.tid);
    this.formData.append('action', 2);
    this.formData.append('filename', 'files');

    this.tasks.updateUploads(this.formData).subscribe(res => {
        // console.log(res);
        if (res) {
            this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）', '1');
        }
    })
    // this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）');
    // this.modalCtrl.dismiss();
}
//   photo_submit() {
//       if (JSON.stringify(this.gongcheng_uploadFileArr) == "[]") {
//           this.onTixing('没有上传图片');
//       } else {
//         //   let action_records = JSON.stringify({
//         //       task_id: this.tid,
//         //       my_task_id: this.mid,
//         //       action: '2',
//         //       user_id: this.user_id
//         //   });
//           let action_records ={
//             task_id: this.tid,
//             my_task_id: this.mid,
//             action: '2',
//             user_id: this.user_id
//         };
//           this.tasks.insertTaskActionRecords(action_records).subscribe(res => {


//             let ress:any = this.toolsmodel.decodeUrlList(res);
//             // if(ress.error == '0'){
//             //     this.tasksList = ress.body;
//             //     this.num = ress.body.length;
//             // }
//               if (ress.error == '0') {
//                   let in_ta_ac_id = ress.body;
//                     for(var o in this.gongcheng_uploadFileArr){
//                       console.log(this.gongcheng_uploadFileArr[o]);
//                       let gongcheng_params = {
//                           user_id: this.user_id,
//                           task_id: this.tid,
//                           my_task_id: this.mid,
//                           task_item_id: o,
//                           filename: 'gongcheng',
//                           in_ta_ac_id:in_ta_ac_id
//                       };
//                       this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);

//                       let gongcheng_my_task_items_params = {
//                           my_task_id: this.mid,
//                           task_item_id: o,
//                           my_task_item_id: this.my_task_item_id_arr[o],
//                           photo_amount:this.gongcheng_uploadFileArr[o].length,
//                           task_action_records_id:in_ta_ac_id,
                 
//                       };
//                       console.log(gongcheng_my_task_items_params);
//                       this.tasks.updateMyTaskItems(gongcheng_my_task_items_params).subscribe(res => {
//                       })
//                     }  
//                     // 修改my_task表中的经纬度
//                     let my_task_update_data ={
//                     my_task_id: this.mid,
//                     lon: this.gps_address_x,
//                     lat: this.gps_address_y
//                     };
//                     this.mytasksmodel.updateMyTask(my_task_update_data).subscribe(res => {
//                     })
//               }
//           });
//           this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）');
//           this.router.navigateByUrl('/index');
//       }
//   }
    async open_search() {
        this.dizhi_type = '1';
        // this.dizhi_check='1'
        this.gps_address = '';
        const modal = await this.modalCtrl.create({component: SearchPage });
        modal.onDidDismiss().then(res => {
            console.log('ondiddddddd');
            this.router.onSameUrlNavigation = 'reload';
            // this.messageService.message$.subscribe(action => this.action = action);
            // console.log(this.action, 'this.actionnnnnnnnnnnn');
        });
        await  modal.present();
    }
   /**
   * 在现场获取地理位置
   */
   async onGpsTo() {
       this.on_scene = '1';
       this.dizhi_type = '1';
       const geolocation = new BMap.Geolocation();
       await geolocation.getCurrentPosition((resp) => {  // 获取经纬度
           // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
           let x = resp.latitude;
           let y = resp.longitude;
           // let X = parseFloat(x) - parseFloat('0.0056225')
           // let Y = parseFloat(y) + parseFloat('0.083662')
           this.gps_address_x = x;
           this.gps_address_y = y;
           this.zh_chinese( x, y );
       })
   }
   zh_chinese(x, y) {
        let that = this
        // 百度地图根据经纬度位置获取对应的位置中文
        const geocoder = new BMap.Geocoder();
        const point = new BMap.Point(y, x);
        geocoder.getLocation(point, function(geocoderResult) {
            // that.gps_address = geocoderResult.address;  参数this.address 换为this.action
            const  addComp = geocoderResult.addressComponents;
            that.action = addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber;
            // 解决层叠获取action后，页面未能及时刷新，--
            that.cdr.markForCheck();
            that.cdr.detectChanges();
        });
    }
   async open_position() {
        const modal = await this.modalCtrl.create({component: PositionPage });
        modal.onDidDismiss().then(res => {
            this.router.onSameUrlNavigation = 'reload';
            // let selTab = this.tabRef.getSelected();
            // this.router.navigateByUrl('/default/renwu/'+selTab);
        });
        await  modal.present();
    }
  /*  onGpsTo() {
        this.gps_play_shouquan();
    }
    // 拉取授权gps
    gps_play_shouquan() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.get_address_bybaidumap_shouquan(resp.coords.latitude + 0.006000, resp.coords.longitude + 0.010000);
        }).catch((error) => {
            console.log(error);
        });
    }*/

    /**
     *
     * @param x 授权获取百度地图具体位置
     * @ param y
     */
    get_address_bybaidumap_shouquan(x, y) {
        this.gps_address_x = x;
        this.gps_address_y = y;
        let that = this;
        // 原始GPS坐标转为百度坐标
        const baiduPoint = new BMap.Point(y, x);
        const myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint, function(result) {
            if (result) {
                that.dizhi_type = '0';
                that.gps_address = result.address;
            } else {
                return 'err';
            }
        });
    }
    hideBigImage() {
        this.showBigImageState = false;
      }
    showBigImage(i, ti) {
        this.big_img_count = this.taskInfo.mytask.my_tt_list[i].img_srcs.length - 1;
        this.big_img = this.taskInfo.mytask.my_tt_list[i].img_srcs[ti].img_src;
        this.big_img_i = i;
        this.big_img_ti = ti;
        this.yangliImg = false;
        this.showBigImageState = true;
      }
      /**
       * 查看样例
       * @ param i
       */
      // yangliImgOne(i){
      //   this.big_img_ti = 0;
      //   this.big_img_count=1;
      //   this.big_img = ConfigModel.BASE_IMG_URL+'/'+this.taskInfo.mytask.my_tt_list[i].tiimg_list.img_name;
      //   this.yangliImg = true;
      //   this.showBigImageState=true;
      // }
    yangliImgOne(i) {
        this.big_img_ti = 0;
        // this.big_img_count = 1;
        // 若是想要样例只显示第一张不轮播，则注释掉下面两行开启上面一行，换掉seipeEvnet函数
        this.big_img_i = i;
        this.big_img_count = this.taskInfo.mytask.my_tt_list[i].tiimg_list.img_name.length;
        this.big_img = this.taskInfo.mytask.my_tt_list[i].tiimg_list.img_name[0];
          // this.big_img = ConfigModel.BASE_IMG_URL + '/' + this.taskInfo.mytask.my_tt_list[i].tiimg_list.img_name;
        this.yangliImg = true;
        this.showBigImageState = true;
    }
    swipeEvnet(event){
        // console.log('进入滑动');
        //向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            let big_img_ti = this.big_img_ti+1;
            if(this.taskInfo.mytask.my_tt_list[this.big_img_i].tiimg_list.img_name[big_img_ti] ){
                this.big_img_ti = big_img_ti;
                this.big_img = this.taskInfo.mytask.my_tt_list[this.big_img_i].tiimg_list.img_name[this.big_img_ti];
            }
        }
        //向右滑
        if (event.direction == 4) {
            // console.log('进入左滑动');
            let big_img_ti = this.big_img_ti-1;
            if(this.taskInfo.mytask.my_tt_list[this.big_img_i].tiimg_list.img_name[big_img_ti]){
                this.big_img_ti = big_img_ti;
                this.big_img = this.taskInfo.mytask.my_tt_list[this.big_img_i].tiimg_list.img_name[this.big_img_ti];
            }
        }
    }
      // swipeEvnet(event){
      //   console.log('进入滑动');
      //   //是样例则不走
      //   // if(this.yangliImg){
      //   //   return;
      //   // }
      //   //向左滑
      //   if (event.direction == 2) {
      //       console.log('进入左滑动');
      //
      //       var big_img_ti = this.big_img_ti+1;
      //       if(this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
      //         this.big_img_ti = big_img_ti;
      //         this.big_img = this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src;
      //       }
      //   }
      //
      //   //向右滑
      //   if (event.direction == 4) {
      //       console.log('进入左滑动');
      //       var big_img_ti = this.big_img_ti-1;
      //       console.log(this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src);
      //       if(this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
      //         this.big_img_ti = big_img_ti;
      //         this.big_img = this.taskInfo.mytask.my_tt_list[this.big_img_i].img_srcs[big_img_ti].img_src;
      //       }
      //   }
      // }
      back() {
        this.modalCtrl.dismiss();
        }

    async gongcheng_img_fangqi(i) {
        // const alert = await this.alertController.create({
        //     backdropDismiss: false,
        //     header: '确定放弃此项吗?',
        //     cssClass: 'gongsi',
        //     buttons: [
        //         {
        //             text: '取消',
        //             role: 'cancel',
        //             cssClass: 'primary',
        //             handler: () => {
        //             }
        //         }, {
        //             text: '确定',
        //             cssClass: 'sure',
        //             handler: (value) => {
        //                 this.taskInfo.mytask.my_tt_list[i].img_srcs = [];
        //                 this.taskInfo.mytask.my_tt_list[i].img_fangqi_srcs = this.taskInfo.mytask.my_tt_list[i].img_fangqied_srcs;
        //                 // this.get_key_item(this.taskInfo.tt_list[i].id, '2');
        //                 this.gongcheng_uploadFileArr[this.taskInfo.tt_list[i].id] = []; // 将添加过的照片清空
        //                 this.cdr.markForCheck();
        //                 this.cdr.detectChanges();
        //             }
        //         }
        //     ]
        // });
        // // return await
        // // alert.present();
        // await alert.present();
        // 加上放弃与恢复逻辑
        if (this.is_fangqi) {
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
                        }
                    }, {
                        text: '确定',
                        cssClass: 'sure',
                        handler: (value) => {
                            this.taskInfo.mytask.my_tt_list[i].img_srcs = [];  // +置空
                            this.taskInfo.mytask.my_tt_list[i].img_fangqi_srcs = this.taskInfo.mytask.my_tt_list[i].img_fangqied_srcs;  // 换为已放弃图片
                            if (this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] == undefined) {
                                this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = new Array();
                                console.log(this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id], '222');
                            }
                            this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = []; // 将添加过的照片清空
                            this.cdr.markForCheck();
                            this.cdr.detectChanges();
                            // document.getElementById('btn').remove(); // 执行后可以直接移除它，但是也就没有了'已放弃'
                            this.is_fangqi = false;
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
                            // this.taskInfo.mytask.my_tt_list[i].img_srcs = this.taskInfo.mytask.my_tt_list[i].img_srcs_b;
                            this.taskInfo.mytask.my_tt_list[i].img_srcs.push({img_src: this.avatarPath, dis: 1}); // 增加一个默认图片
                            this.taskInfo.mytask.my_tt_list[i].img_fangqi_srcs = this.taskInfo.mytask.my_tt_list[i].img_fangqi_srcs_b
                            // this.get_key_item(this.taskInfo.tt_list[i].id, '2');
                            if (this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] == undefined) {
                                this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = new Array();
                                console.log(this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id], '222');
                            }
                            this.gongcheng_uploadFileArr[this.taskInfo.mytask.my_tt_list[i].id] = []; // 将添加过的照片清空
                            this.cdr.markForCheck();
                            this.cdr.detectChanges();
                            // document.getElementById('btn').remove(); //执行后可以直接移除它，但是也就没有了'已放弃'
                            this.is_fangqi = true;
                            // console.log(this.tasksListCon, 'this.tasksListCon111eeeeeeeeeeeeeeeeeeeeee');
                        }
                    }
                ]
            });
            // return await
            // alert.present();
            await alert.present();
        }

    }

}
