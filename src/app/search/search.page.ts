import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MapModel,  ToolsModel, LocalStorageModel,LoginModel,MyXiaoxisModel} from '../model';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import {ModalController} from '@ionic/angular';
import { RenwuShenhezhongPage } from '../renwu-shenhezhong/renwu-shenhezhong.page';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
import { RenwuUpdateTishiPage } from '../renwu-update-tishi/renwu-update-tishi.page';

import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';
import { RenwuTongguoPage } from '../renwu-tongguo/renwu-tongguo.page';
import { MessageService } from '../service/message.service';
import {PositionPage} from '../position/position.page';
import { ToastController } from '@ionic/angular';
declare var BMap: any;
@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    search: boolean = true;
    txtin: any;
    action: any;
    id: string;
    X: any;
    Y: any;
    gps_address_x: any;
    gps_address_y: any;
    myxiaoxiList: any;
    messageslist: any[] = [];
    num: number;
    GoPage:any;
    in:any;
    constructor(
                public toastController: ToastController,
                private messageService: MessageService,
                public router: Router,
                public route: ActivatedRoute,
                public toolsmodel: ToolsModel,
                public httpClient: HttpClient,
                public localstorageModel: LocalStorageModel,
                public loginmodel: LoginModel,
                public myxiaoximodel: MyXiaoxisModel,
                private modalCtrl: ModalController
    ) {
    }


    ngOnInit() {
        // let that = this
        // let geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition((resp) => {
        //     // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
        //     let x = resp.latitude;
        //     let y = resp.longitude;
        //
        //     //百度地图根据位置获取对应的位置中文
        //     let geocoder = new BMap.Geocoder();
        //     let point = new BMap.Point(y,x);
        //     geocoder.getLocation(point,function(geocoderResult,LocationOptions){
        //         // alert(geocoderResult.address);
        //         // that.action = geocoderResult.address;
        //         // that.dizhi_type='1'
        //     });
        // })
        // 组件A发送消息3
        // this.message.sendMessage(3);
        // const b = this.message.getMessage(); // 组件A接收消息；

        // const map = new BMap.Map('map');//创建地图实例
        // const point = new BMap.Point(116.404, 39.915);//创建点坐标
        // map.centerAndZoom(point, 15);//初始化地图，设置中心点坐标和地图级别
        // map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放

        // this.get_city_bd_t();
        // console.log(this.x);
        // let that = this;
/*获取地名*/
//         var map = new BMap.Map("allmap");
//         var point = new BMap.Point(116.331398,39.897445);
//         // map.centerAndZoom(point,12);
//         map.centerAndZoom("北京",12);
//         var geoc = new BMap.Geocoder();
//
//         map.addEventListener("click", function(e){
//             var pt = e.point;
//             geoc.getLocation(pt, function(rs){
//                 var addComp = rs.addressComponents;
//                 // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
//                 that.txtin = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
//                 console.log(that.txtin,'txtin');
//             });
//         });
// /*获取经纬度*/
//         // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
//         map.centerAndZoom("北京",12);
//         function showInfo(e){
//             // alert(e.point.lng + ", " + e.point.lat);
//         }
//         map.addEventListener("click", showInfo);

        // this.position()
        // this.get_city_bd_t()
        // var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition((resp) => {
        //     // this.get_address_bybaidumap_shouquan(resp.latitude+0.006000,resp.longitude+0.010000);
        //
        //     var x = resp.latitude;
        //     var y = resp.longitude;
        //     this.gps_address_x = x;
        //     this.gps_address_y = y;
        //     // var geocoder = new BMap.Geocoder();
        //     // var point = new BMap.Point(y,x);
        //     console.log(x,'xxxxxxxxxxxxxxxxxx');
        //
        //     /*  geocoder.getLocation(point,function(geocoderResult,LocationOptions){
        //           // alert(geocoderResult.address);
        //           that.gps_address = geocoderResult.address;
        //           if(geocoderResult.address){
        //               console.log('11111111');
        //               that.dizhi_type = ' 1 ';
        //               // that.get_key_item(this.gps_id,'1');
        //           }else{
        //               return 'err';
        //           }
        //       });*/
        //     function G(id) {
        //         return document.getElementById(id);
        //     }
        //
        //     console.log(this.gps_address_x,'');
        //     // let that = this
        //     // console.log(Y,'this.yyyyyyyyyyyyyyyy');
        //     var map = new BMap.Map("allmap");
        //     var point = new BMap.Point(y,x);
        //
        //     console.log(point,'pointllllllllllllllll');
        //     map.centerAndZoom(point,15);                   // 初始化地图,设置城市和地图级别。
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

            /*点击事件*/
/*
            var geoc = new BMap.Geocoder();
            let that = this
            map.addEventListener("click", function(e){
                var pt = e.point;
                geoc.getLocation(pt, function(rs){
                    var addComp = rs.addressComponents;
                    // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    that.txtin = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                    console.log(that.txtin,'txtin');
                });
            });
            /!*获取经纬度*!/
            // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            map.centerAndZoom(point,15);
            function showInfo(e){
                // alert(e.point.lng + ", " + e.point.lat);
            }
            map.addEventListener("click", showInfo);*/


        // })



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


 async sendMessage(action: string) {
     const inputContant = (document.getElementById('suggestId') as HTMLInputElement);
     if (inputContant.value.length < 6) {
         this.presentToast('地址最少输入6个字符，请重新填写')
         inputContant.value = '';
         inputContant.focus();
         return false;
     }


        // 现依然为页面传值 现在ondid 函数可以识别了，可以换回ionic语法
        this.messageService.messageAction(action);
       // let selTab = this.tabRef.getSelected();RenwuZuorenwuPage
       //  this.router.onSameUrlNavigation = 'reload';
        this.back();
        this.router.navigateByUrl('/default');
    }
    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle',
        });
        toast.present();
    }
    back() {
        this.modalCtrl.dismiss();
    }

}
