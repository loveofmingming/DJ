
import { Component, OnInit,ViewChild  } from '@angular/core';
import {ModalController,IonTabBar, IonTabs,NavController,LoadingController} from '@ionic/angular'; 
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToolsModel,LocalStorageModel,MapModel, MyXiaoxisModel,MyTasksModel,LoginModel,TasksModel } from '../model';
import {XiaoxiPage} from '../xiaoxi/xiaoxi.page';
import { Router } from '@angular/router';
 
declare var BMap;
@Component({
  selector: 'app-renwu',
  templateUrl: './renwu.page.html',
  styleUrls: ['./renwu.page.scss'],
})
export class RenwuPage{ 
  gps_city:any;
  gps_x:any;
  gps_y:any;
  gps_time:any;
  xiaoxi_count:any;
  wode_renwu_count:any;
  leave:any;
  @ViewChild('renwupages',{ static: true }) tabRef:IonTabs;
  constructor(public router: Router,
    public modalCtrl:ModalController,
    public localstorage: LocalStorageModel,
    public mapmodel: MapModel,
    public taskmodel: TasksModel,
    public toolsmodel: ToolsModel,
    public loginmodel: LoginModel,
    public mytasksmodel: MyTasksModel,
    public myxiaoximodel:MyXiaoxisModel,
    public geolocation: Geolocation,
    public androidPermissions: AndroidPermissions,
    public navUrl:NavController
    ) {
      
     }

  ngOnInit() {
    console.log('chushihua');
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
        this.router.navigateByUrl('/home');
        return;
      }else{
        this.gps_city = login_info.body.gps_city;
        this.gps_time = login_info.body.gps_time;
        this.get_city_gps('pickables');
        this.get_weidu_xiaoxi(); 
      }
    }); // 登陆验证
    
  }
    ionViewDidEnter(): void {
        this.get_city_gp_c();
    }
  get_weidu_xiaoxi(){
    this.myxiaoximodel.getWeiDuXiaoXiCount().subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
        this.xiaoxi_count = ress.body;
      }else{
        this.xiaoxi_count = '';
      }
      
    });
  }
  get_wode_renwu(){
    this.mytasksmodel.getWoDeTaskCount().subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
        console.log(ress.body);
        this.wode_renwu_count = ress.body;
      }else{
        this.wode_renwu_count = '0';
      }
      
    });
  }

  get_city_gps(type){
    console.log('dingwei');
    this.get_wode_renwu();
    // if(type=='pickables'){
      
    // }else if(type=='mine'){

    // }
      this.get_city_gp_c();
    var today_time = this.toolsmodel.getTodayTime();
    // var gps_time = this.localstorage.getStore('gps_time'); //上次获取地理位置加上半个小时
    
    if((today_time < this.gps_time) && this.gps_city !=""){
       
        // this.gps_city = this.gps_city;
        // this.gps_x = this.localstorage.getStore('gps_x');
        // this.gps_y = this.localstorage.getStore('gps_y');
    }else{
        this.get_city_gp_c();
    }       
  }

//获取经纬度
get_city_gp_c(){
    //39.962653,116.820007
    //39.968381,116.832371
    //38.8771368433,115.5760853416
    this.gps_city = '正在定位...';
    this.geolocation.getCurrentPosition().then((resp) => {
    // console.log(resp.coords.latitude,resp.coords.longitude);
    // this.gps_x = resp.coords.latitude;
    // this.gps_y = resp.coords.longitude;
    // this.get_address_bybaidumap(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000,this);
    }).then(()=>{
      this.updatesessioninfo();
    }).catch((error) => {

    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS]).then(r => {
        // 申请权限成功
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   this.gps_x = resp.coords.latitude;
        //   this.gps_y = resp.coords.longitude;
        // });
      }).catch(err => {
        console.log('Error getting location', error);
      });
   
    });
}

//百度地图地理逆编码
get_address_bybaidumap(x,y,that){
//let that = this;
//原始GPS坐标转为百度坐标
var baiduPoint = new BMap.Point(y,x);
var myGeo = new BMap.Geocoder();
// tslint:disable-next-line:only-arrow-functions
myGeo.getLocation(baiduPoint,function(result){
    if(result){
      var test  = result.addressComponents.province+'-'+result.addressComponents.city+'-'+result.addressComponents.district+
        '-'+result.addressComponents.street;
        that.gps_city = result.addressComponents.city;
        if(that.gps_city == ''){
            that.gps_city = '定位失败';
            return;
        }
        that.gps_time = that.mapmodel.getTodayTimeAddHours(0.5);
        // window.localStorage.setItem('gps_city',that.gps_city);
        // window.localStorage.setItem('gps_time',gps_time);
        // window.localStorage.setItem('gps_x',x);
        // window.localStorage.setItem('gps_y',y);
        // that.setCitySpace(that.gps_city)
    }else{
        that.gps_city = '定位失败';
    }
  });    
}

updatesessioninfo(){
      //更新session
      let sessioncon = {
        gps_city:this.gps_city,
        gps_time:this.gps_time,
        gpsx:this.gps_x,
        gpsy:this.gps_y
      }
      this.loginmodel.updateSessionInfo(sessioncon).subscribe(res => {
      });
}
   
  async open_xiaoxi(){
   
    const modal = await this.modalCtrl.create({component: XiaoxiPage });
    modal.onDidDismiss().then(res=>{
      this.router.onSameUrlNavigation='reload';
      let selTab = this.tabRef.getSelected();
      this.router.navigateByUrl('/default/renwu/'+selTab);
    });
    
    await  modal.present();
  }
}
