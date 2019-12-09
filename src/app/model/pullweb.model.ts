import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
@Injectable()

export class PullWebModel {
    constructor(public http: HttpClient) {
    }
    private url: string = ConfigModel.BASE_URL;

    // 根据infoid获取推送
    getPullWeb(userId) {
        return this.http.get(this.url + '/xiaoxi/MyXiaoxi/getPushXiaoXi' + `?userId=${userId}`);
    }
    //更新推送状态
    updatePullWeb(messageId){
        return this.http.get(this.url + '/xiaoxi/MyXiaoxi/updatePullWeb' + `?messageId=${messageId}`);
    }

}