import { Injectable } from '@angular/core';
import { ConfigModel } from '../model/config.model';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Platform, LoadingController } from '@ionic/angular';
@Injectable()

export class ToolsModel {
  headers: any;
  options: any;
  url: string;
  loading: any;
  constructor(
              public http: HttpClient,
              public platform: Platform,
              public loadingCtrl: LoadingController
            ) {
              this.url = ConfigModel.BASE_URL;
  }


  postUrl( post_url: any, data: any, type: any = true)
  {
    if (type) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let pramasJs = JSON.stringify(data);
      this.options = new RequestOptions({ headers: this.headers, withCredentials: true});

      return this.http.post(this.url + post_url, pramasJs, this.options);
    } else {
      // form表单上传文件
      let pramasJs = data;
      return this.http.post(this.url + post_url, pramasJs, {withCredentials: true});
    }
  }
    getUrl( post_url: any, data: any, type: any = true )
    {
        if (type) {
            this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
            let pramasJs = JSON.stringify(data);
            this.options = new RequestOptions({ headers: this.headers, withCredentials: true});

            return this.http.post(post_url, pramasJs, this.options);
        } else {
            // form表单上传文件
            let pramasJs = data;
            return this.http.post(this.url + post_url, pramasJs, {withCredentials: true});
        }
    }
    // getData1(url: string, options ?: any, myheaders?: any): Observable<any> {
    //     // 配置请求头
    //     const myHeaders: Headers = new Headers();
    //     // tslint:disable-next-line:forin
    //     for (const key in myheaders) {
    //         myHeaders.append(key, myheaders[key]);
    //     };
    //     // if (url.indexOf("?") != -1) {
    //     //     var str = url.substr(1);
    //     //     strs = str.split("&");
    //     //     for(var i = 0; i < strs.length; i ++) {
    //     //         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    //     //     }
    //     // }
    //     // if(url.indexOf("?")!=-1){
    //     //     var str = url.substr(1);
    //     //     strs= str.split("&");
    //     //     strs[0].split("=")[1];
    //     //     var ip = strs[0].split("=")[1];
    //     //     console.log(ip);
    //     // }
    //     url += (url.indexOf('?') < 0 ? '?' : '&') + this.param(options);
    //     console.log(url,'urllllllllllllllllllllllllll');
    //     return this.http.get(url, { headers: myHeaders }).map(res => res.json());
    // }
  async postUrlTongbu( post_url: any, data: any)
  {
      console.log('def');
      this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let pramasJs = JSON.stringify(data);
      this.options = new RequestOptions({ headers: this.headers, withCredentials: true});
      // return this.http.post(this.url + '/tasks/Tasks/getTasks', this.options);
      let jsonData: any;
      await this.http.post(this.url + post_url, pramasJs, this.options).toPromise().then(res => {
        jsonData = this.decodeUrlList(res);
      });
      return jsonData;
  }
// 解析php中encodeurl
decodeUrlList(list) {
    let new_list = [];
    if (list.constructor === String) {
      return decodeURIComponent(list);
    } else {
      for ( let o in list) {
        new_list[o] = (list[o].constructor === String) ? decodeURIComponent(list[o]) : this.decodeUrlList(list[o]);
       }
    }
    return new_list;
  }



  /**
   * 获取当前时间
   */
  getTodayTime() {
    return new Date(+new Date() + 8 * 3600 * 1000 ).toISOString().replace(/T/g, '').replace(/\.[\d]{3}Z/, '');
  }

  /**
   * 获取当前时间 增加几个小时
   */
  getTodayTimeAddHours(hours: number) {
    return new Date(+new Date() + 8 * 3600 * 1000 + hours * 3600 * 1000 ).toISOString().replace(/T/g, '').replace(/\.[\d]{3}Z/, '');
  }
  /**
   * @ returns {boolean}
   * @ memberof
   */
  isMobile() {
      // return this.platform.is("mobile") && !this.platform.is("mobileweb");
      return this.platform.is('mobile');
  }
  /**
   * @ returns { boolean }
   * @ memberof
   */
  isAndroids() {
      return this.isMobile() && this.platform.is('android');
  }

  /**
   * 删除方法
   * @ param list
   * @ param index
   */
  Arrayremove(list, index) {
    // 检查index位置是否有效
    if (index >= 0 && index < list.length) {
       var part1 = list.slice(0, index);
       var part2 = list.slice(index);
       part1.pop();
       return (part1.concat(part2));
      }
      return list;
  }

}
