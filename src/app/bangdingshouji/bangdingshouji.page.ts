import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute,Router } from '@angular/router';           //跳转类库
import { ToastController,LoadingController } from '@ionic/angular';   //弹窗类库
import { LoginModel,ToolsModel} from '../model';
@Component({
  selector: 'app-bangdingshouji',
  templateUrl: './bangdingshouji.page.html',
  styleUrls: ['./bangdingshouji.page.scss'],
})
export class BangdingshoujiPage implements OnInit {
  wechat:any;
  sjName: string;  //接收手机账号
  yzmName: string;  //接收手机验证码
  constructor( 
    public toastCtrl: ToastController,
    public _router:Router,
    public route: ActivatedRoute,
    public loginmodel: LoginModel,
    public toolsmodel:ToolsModel
  ) { 
    this.wechat = this.route.snapshot.paramMap.get('wechat');
    alert(this.wechat);
  }

  ngOnInit() {
    this.sjName="";
    this.yzmName=""; 
    this.logoCode.name="立即绑定";
    this.logoCode.disable=true;   
  }
  //获取验证码部分
  mobileCode : any = {   //定义数组
    name:"获取验证码",
    time:60,
    disable:true
}
getYanzheng(){
    if(!this.sjName){
      this.toastTip("请输入手机号码！")
      return;
    }
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test(this.sjName)){
        alert("请输入正确的手机号!");return;
    }else{
        let getYzm_info = {
          sjName:this.sjName
        }
        


        this.loginmodel.getYzm(getYzm_info).subscribe(res => {
          res = this.toolsmodel.decodeUrlList(res);
          if(res.error!='0'){
            this.toastTip(res.body); return;
          }else{
            this.mobileCode.disable = false;
            this.setTime();  
            return;
          }
        });
    }
}
setTime(){
    if(this.mobileCode.time == 0){
        this.mobileCode.time = 60;
        this.mobileCode.name="获取验证码";
        this.mobileCode.disable = true;
        return;
    }else{
      this.mobileCode.time -- ;
    }
    setTimeout(()=>{     //定时器
      this.mobileCode.name=this.mobileCode.time+"秒后重新获取";
      this.setTime();
    },1000);
}

//登录部分
logoCode : any = {   //定义数组
  name:"立即绑定",
  disable:true
}
bangding(){
  if(!this.sjName){
    this.toastTip("请输入手机号码！")
    return;
  }
  if(!this.yzmName){
    this.toastTip("请输入手机验证码！")
    return;
  }
  this.logoCode.name="绑定中..";
  this.logoCode.disable=false;
  let post_user_info = {
    sjName:this.sjName,
    yzmName:this.yzmName,
    wechat:this.wechat
  };
  this.loginmodel.wechatBangding(post_user_info).subscribe(res => {
    let ress:any = this.toolsmodel.decodeUrlList(res);
    if(ress.error!=0){
      this.toastTip(ress.body);
      this.logoCode.name="立即绑定";
      this.logoCode.disable=true;
      return;
    }else{ 
      
      this._router.navigateByUrl("/default");   //跳转
      return;
    }
  });
}

//警告提醒部分
async toastTip(message: string) {
  let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle' //Type : 	"bottom" | "middle" | "top"
    });
  toast.present();
}  
 

}
