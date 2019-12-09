import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { Router} from '@angular/router';
import { ToolsModel } from './tools.model';
@Injectable()

export class UpdateUserInfoModel {
    constructor(public http: HttpClient,
    public router: Router,public tools:ToolsModel ) {
    }
    private url: string = ConfigModel.BASE_URL;

    updateInfoNameByInfoid(con): any {
        return this.tools.postUrl('/wode/Login/updateUserNameByInfoid',con);
    }
    updateCompanyByInfoid(con): any {
        return this.tools.postUrl('/wode/Login/updateCompanyByInfoid',con);
    }
}