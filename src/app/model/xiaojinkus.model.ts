import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { ToolsModel } from './tools.model';
@Injectable()

export class XiaoJinKusModel {
    constructor(public http: HttpClient,public tools:ToolsModel) {
    }
    private url: string = ConfigModel.BASE_URL;

    // 根据infoid获取小金库的余额
    getAllXiaoJinKuYueByInfoId() {
        return this.tools.postUrl('/xiaojinkus/XiaoJinKus/getAllXiaoJinKuYueByInfoid',{});
    }

    // 根据infoid获取小金库的转入记录
    getAllXiaoJinKuZhuanRuByInfoId() {
        return this.tools.postUrl('/xiaojinkus/XiaoJinKus/getAllXiaoJinKuZhuanRuByInfoid',{});
    }

    // 根据infoid获取小金库的转出记录
    getAllXiaoJinKuZhuanChuByInfoid() {
        return this.tools.postUrl('/xiaojinkus/XiaoJinKus/getAllXiaoJinKuZhuanChuByInfoid',{});
    }

    getUserInfoByUserId() {
        return this.tools.postUrl('/xiaojinkus/XiaoJinKus/getUserInfoByUserId',{});
    }

}