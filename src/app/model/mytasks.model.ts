import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { ToolsModel } from './tools.model';
@Injectable()

export class MyTasksModel {
  constructor(public http: HttpClient,public tools:ToolsModel) {
  }
  private url: string = ConfigModel.BASE_URL;


    getAllOfMyTasks() {
        // return this.tools.postUrl('/tasks/MyTasks/getAllOfMyTasks', {});
        return this.tools.postUrlTongbu('/tasks/MyTasks/getAllOfMyTasks', {});

    }
    getInfoMyTaskById(con) {
        return this.tools.postUrl('/tasks/MyTasks/getInfoMyTaskNeedById', con);
    }
    getInfoMyTaskAllById(con) {
        return this.tools.postUrl('/tasks/MyTasks/getInfoMyTaskById', con);
    }
    updateMyTask(con) {
        return this.tools.postUrl('/tasks/MyTasks/updateMyTaskInfoById', con);
    }
    fangqiUpdate(con) {
        return this.tools.postUrl('/tasks/MyTasks/fangqiUpdate', con);
    }
    getWoDeTaskCount() {
        return this.tools.postUrl('/tasks/MyTasks/getWoDeTaskCount', {});
    }
    // 判断是否过期
    getIsGuoqiMyTaskById(con) {
        return this.tools.postUrlTongbu('/tasks/MyTasks/getIsGuoqiMyTaskById', con);
    }
}
