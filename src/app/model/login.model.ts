import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { Router} from '@angular/router';
import { ToolsModel} from './tools.model';
import { promise } from 'protractor';
@Injectable()

export class LoginModel
 {
  constructor(
    public http: HttpClient,
    public router: Router ,
    public tools: ToolsModel
  ) {}
  uid: string;
  uLoginTime: string;
  private url: string = ConfigModel.BASE_URL;
  private app_id : string = ConfigModel.BASE_APP_ID;
  private app_secret : string = ConfigModel.BASE_APP_SECRET;

  // 登录验证
  accountLogin(con): any {
    // return this.http.post(this.url+'/wode/Login/accountLogin',con);
    return this.tools.postUrl('/wode/Login/accountLogin',con);
  }

  // 获取验证码
  getYzm(con): any {
    // return this.http.post(this.url+'/wode/Login/getYzm',{ sjname });
    return this.tools.postUrl('/wode/Login/getYzm',con);
  }

  // 是否登录判断
  LoginSession() {
    return this.tools.postUrl('/wode/Login/getLoginUserInfo', '');
  }
  getSessionWeixinUserInfo() {
    return this.tools.postUrl('/wode/Login/getSessionWeixinUserInfo', '');
  }
  // 是否登录判断
  LoginSessionT() {
    return this.tools.postUrlTongbu('/wode/Login/getLoginUserInfo', '');
  }
  clearSession() {
    return this.tools.postUrl('/wode/Login/clearSession', '');
  }
  // 写入登录成功日志
  loginRizhi(uid: string) {
    return this.http.post(this.url + '/wode/Login/loginRizhi', { uid });
  }
  // 更新session
  updateSessionInfo(con) {
      console.log('000000000000000000000000');
      return this.tools.postUrl('/wode/Login/updateSessionInfo', con);
  }

 // 微信授权登录
 getLoginWechat(wechat){
   let sum = wechat.substring( 3, 8) + 'QaZ';
   let con = { wechat: wechat, sum: sum};
   return this.tools.postUrl('/wode/Login/getLoginWechat', con );
 }

 /**
  * 微信绑定手机
  */
 wechatBangding(con) {
  return this.tools.postUrl('/wode/Login/wechatBangding',con);
 }

 getWechatInfo(code) {
  // alert("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + this.app_id + "&secret=" + this.app_secret + "&code=" + code + "&grant_type=authorization_code");
  // return this.http.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + this.app_id + "&secret=" + this.app_secret + "&code=" + code + "&grant_type=authorization_code",{});
  let con = {
    code:code
  }
  return this.tools.postUrl('/wode/Login/getLoginWechat', con);
}
updateWeixinInfo(code) {
  let con = {
    code: code
  }
  return this.tools.postUrl('/wode/Login/updateWeixinInfo', con);
}
 }
