import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MapModel,  ToolsModel, LocalStorageModel, LoginModel, MyXiaoxisModel} from '../model';
import {ModalController} from '@ionic/angular';

import { MessageService } from '../service/message.service';
declare var BMap: any;
@Component({
  selector: 'app-position',
  templateUrl: './position.page.html',
  styleUrls: ['./position.page.scss'],
})
export class PositionPage implements OnInit {
    gps_address_x: any;
    gps_address_y: any;
    gps_address: any;
  x: any;
  y: any;
  id: string;
  0.0056225: string;
  0.083662: string;
  myxiaoxiList: any;
  txtin:any;
  messageslist:any[] = [];
  num: number;
  GoPage:any;
  Point: any;
  constructor(
      private cdr: ChangeDetectorRef,
      private messageService: MessageService,
      public router: Router,
      public route: ActivatedRoute,

      public toolsmodel: ToolsModel,
      public httpClient: HttpClient,
      public localstorageModel: LocalStorageModel,
      public loginmodel: LoginModel,
      public myxiaoximodel:MyXiaoxisModel,
      private modalCtrl: ModalController
  ) { }

 async ngOnInit() {
      let that = this;

     var geolocation = new BMap.Geolocation();
     geolocation.getCurrentPosition((resp) => {
         // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
         var x = resp.latitude;
         var y = resp.longitude;

         this.gps_address_x = x;
         this.gps_address_y = y;
         let X = parseFloat(x) - parseFloat('0.0056225')
         let Y = parseFloat(y) + parseFloat('0.083662')

         //百度地图根据位置获取对应的位置中文
         var geocoder = new BMap.Geocoder();
         var point = new BMap.Point(Y,X);
         geocoder.getLocation(point,function(geocoderResult,LocationOptions){
             // alert(geocoderResult.address);
             // that.points = geocoderResult.point
             that.txtin = geocoderResult.address;
             // 检测页面数据渲染完毕，保证即时刷新数据
             that.cdr.markForCheck();
             that.cdr.detectChanges();
         });
         function G(id) {
             return document.getElementById(id);
         }
         var map = new BMap.Map("allmap");
         var point = new BMap.Point(y,x);
         var offsetY = 200;
         map.centerAndZoom(point,15);                   // 初始化地图,设置城市和地图级别。
         map.addEventListener("click", function(e){
             var pt = e.point;
             geocoder.getLocation(pt, function(rs){
                 var addComp = rs.addressComponents;
                 that.txtin = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                 Y = e.point.lng;
                 X  = e.point.lat;
                 // 检测页面数据渲染完毕，保证即时刷新数据
                 that.cdr.markForCheck();
                 that.cdr.detectChanges();
             });
         });


         var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
             {"input" : "suggestId"
                 ,"location" : map
             });

         ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
             var str = "";
             var _value = e.fromitem.value;
             var value = "";
             // console.log(e.fromitem.value,'e.fromitem.value');
             if (e.fromitem.index > -1) {
                 value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
             }
             str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

             value = "";
             if (e.toitem.index > -1) {
                 _value = e.toitem.value;
                 value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
             }
             str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
             G("searchResultPanel").innerHTML = str;
         });

         var myValue;
         ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
             var _value = e.item.value;
             myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
             G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

             setPlace();
         });

         function setPlace(){
             map.clearOverlays();    //清除地图上所有覆盖物
             function myFun(){
                 var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                 map.centerAndZoom(pp, 18);
                 map.addOverlay(new BMap.Marker(pp));    //添加标注
             }
             var local = new BMap.LocalSearch(map, { //智能搜索
                 onSearchComplete: myFun
             });
             // console.log(myValue,'myValue');
             local.search(myValue);
         }

     })


      this.loginmodel.LoginSession().subscribe(res => {
          let login_info:any = this.toolsmodel.decodeUrlList(res);
          if(login_info.error != '0'){
              this.router.navigateByUrl('/home');
              return;
          }else{
              // this.getMyXiaoxiList();
          }
      }); // 登陆验证
          // this.loginmodel.LoginSession(); // 登陆验证
          // var uid = this.localstorageModel.getStore('userId');
          // this.getMyXiaoxiList(uid);
  }
    // position(){
    //
    //     function G(id) {
    //         return document.getElementById(id);
    //     }
    //
    //     var map = new BMap.Map("almap");
    //     map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。
    //
    //     var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    //         {"input" : "suggestId"
    //             ,"location" : map
    //         });
    //
    //     ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    //         var str = "";
    //         var _value = e.fromitem.value;
    //         var value = "";
    //         console.log(e.fromitem.value,'e.fromitem.value');
    //         if (e.fromitem.index > -1) {
    //             value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    //         }
    //         str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
    //
    //         value = "";
    //         if (e.toitem.index > -1) {
    //             _value = e.toitem.value;
    //             value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    //         }
    //         str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    //         G("searchResultPanel").innerHTML = str;
    //     });
    //
    //     var myValue;
    //     ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    //         var _value = e.item.value;
    //         myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    //         G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    //
    //         setPlace();
    //     });
    //
    //     function setPlace(){
    //         map.clearOverlays();    //清除地图上所有覆盖物
    //         function myFun(){
    //             var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
    //             map.centerAndZoom(pp, 18);
    //             map.addOverlay(new BMap.Marker(pp));    //添加标注
    //         }
    //         var local = new BMap.LocalSearch(map, { //智能搜索
    //             onSearchComplete: myFun
    //         });
    //         console.log(myValue,'myValue');
    //         local.search(myValue);
    //     }
    //
    // }
    async sendMessage(action: string) {

        this.messageService.messageAction(action);
        this.back();
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('/default/renwu/mine');
        this.back();

        //  const modal = await this.modalCtrl.create({component: RenwuZuorenwuPage });
        // modal.onDidDismiss().then(res=>{
        //     this.router.onSameUrlNavigation='reload';
        // });

        // await  modal.present();

    }
    back() {
        this.modalCtrl.dismiss();
    }


}
