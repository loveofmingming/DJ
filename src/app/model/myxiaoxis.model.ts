import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { ToolsModel} from './tools.model';
import {type} from "os";
@Injectable()

export class MyXiaoxisModel {
  constructor(
      public http: HttpClient,
      public tools: ToolsModel
  ) {
  }
  private url : string = ConfigModel.BASE_URL;


    getAllOfMyXiaoxis() {
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/getAllOfMyXiaoxis', {});
      // return this.tools.getUrl('/houtai/php/AppPush/ajax.php', {});
    }
    getWeiDuXiaoXiCount() {
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/getWeiDuXiaoXiCount', {});
    }
    updateMyXiaoXi(con) {
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/updateMyXiaoXi', con );
    }
}