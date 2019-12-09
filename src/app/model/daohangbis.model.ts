import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToolsModel } from './tools.model';
import { ConfigModel } from './config.model';
@Injectable()

export class DaoHangBisModel {
    constructor(public http: HttpClient,public tools:ToolsModel) {
    }
    private url: string = ConfigModel.BASE_URL;

    // getAllOfMyTasks(id) {
    //     return this.http.get(this.url + '/tasks/MyTasks/getAllOfMyTasks' + `?id=${id}`);
    // }
// 根据infoid获取小金库的余额
    getAllDaohangbiYueByInfoId() {
        return this.tools.postUrl('/daohangbis/DaoHangBis/getDaoHangBiYueByInfoid',{});
    }
    getAllDaohangbiZhuanRuByInfoId() {
        return this.tools.postUrl('/daohangbis/DaoHangBis/getAllDaoHangBiZhuanRuByInfoid',{});
    }
    getAllDaohangbiZhuanChuByInfoId() {
        return this.tools.postUrl('/daohangbis/DaoHangBis/getAllDaoHangBiZhuanChuByInfoid',{});
    }

}