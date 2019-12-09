import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { ToolsModel } from './tools.model';
@Injectable()

export class XinYuZhisModel {
    constructor(public http: HttpClient,public tools:ToolsModel) {
    }
    private url: string = ConfigModel.BASE_URL;

    // 根据infoid获取小金库的余额
    getAllXinYuZhiYueByInfoId() {
        return this.tools.postUrl('/xinyuzhis/XinYuZhis/getXinYuZhiYueByInfoid',{});
    }
    // 根据infoid获取小金库的转入记录
    getAllXinYuZhiZhuanRuByInfoId() {
        return this.tools.postUrl('/xinyuzhis/XinYuZhis/getAllXinYuZhiZhuanRuByInfoid',{});
    }
    

}