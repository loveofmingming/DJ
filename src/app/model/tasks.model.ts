import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToolsModel } from './tools.model';
import { ConfigModel } from './config.model';
@Injectable()

export class TasksModel {
  constructor(public http: HttpClient,public tools:ToolsModel) {
  }
  private url: string = ConfigModel.BASE_URL;
 
  getAllTasks() {
      //return this.tools.postUrl('/tasks/Tasks/getTasks',{});
      return this.tools.postUrlTongbu('/tasks/Tasks/getTasks',{});
  }
  getALLtasksID(){
      return this.tools.postUrlTongbu('/tasks/Tasks/getTasksByID',{});
  }

  private encodeHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({fromObject: params});
  }

  getTasksCon(con) {
    return this.tools.postUrl('/tasks/Tasks/getTasksCon', con);
  }

  insertMyTasksCon(con) {
    return this.tools.postUrl('/tasks/Tasks/LingquTasks', con);
  }

  insertTaskActionRecords(con) {
    return this.tools.postUrl('/tasks/Tasks/insertTaskActionRecords', con);
  }

  insertMyTaskItems(con) {
    return this.tools.postUrl('/tasks/MyTasks/insertMyTaskItems', con);
  }
  updateMyTaskItems(con) {
    return this.tools.postUrl('/tasks/MyTasks/updateMyTaskItems', con);
  }

  getOneMytasksCon(con) {
    return this.tools.postUrl('/tasks/MyTasks/getOneOfMyTasksByMtid', con );
  }

  getOneMytasksShenhezhongCon(con) {
    return this.tools.postUrl('/tasks/MyTasks/getOneMytasksShenhezhongCon', con );
  }

  getOneMytasksTongGuoCon(con) {
    return this.tools.postUrl('/tasks/MyTasks/getOneMytasksTongGuoCon', con );
  }
  getOneMytasksWanChengCon(con) {
    return this.tools.postUrl('/tasks/MyTasks/getOneMytasksWanChengCon', con);
  }
  getOneMytasksWeiTongGuoCon(con) {
    return this.tools.postUrl('/tasks/MyTasks/getOneMytasksWeiTongGuoCon', con);
  }

  getMytaskitems(con) {
    return this.tools.postUrl('/tasks/MyTasksItems/getMyTaskItems', con);
  }

  getOneTaskJiangliById(con) {
    return this.tools.postUrl('/tasks/Tasks/LingquJiangli', con);
  }

  // setLingquJiangli(jiangliAny:any,uid:string) {
  //   //return jiangliAny;
  //   return this.http.get(this.url+'/tasks/Tasks/setLingquJiangli' + `?jl=${jiangliAny}&uid=${uid}`);
  // }

  uploads(con) {
    // return this.http.post(this.url+'/tasks/Tasks/uploadsFrom', con);
    return this.tools.postUrl('/tasks/Tasks/uploadsFrom', con, false);
  }
  updateUploads(con) {
    return this.tools.postUrl('/tasks/Tasks/updateUploadsFrom', con, false);
  }
  setLingquJiangli(con) {
    return this.tools.postUrl('/tasks/Tasks/setLingquJiangli', con);
  }

}
