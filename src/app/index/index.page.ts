import {Component, ChangeDetectorRef ,  Input, EventEmitter, Output, Host, Inject, forwardRef } from '@angular/core';
import {RenwuPage} from '../renwu/renwu.page'; //  引入父页面
import {ActivatedRoute, Router} from '@angular/router';
import {TasksModel, ToolsModel,LocalStorageModel,LoginModel,JpushUtilModel , MyTasksModel } from '../model';
import {HttpClient} from '@angular/common/http';
import {ModalController,LoadingController,NavController} from '@ionic/angular'; 
import {RenwuConPage} from '../renwu-con/renwu-con.page';
import { OnEnterPage } from '../model/on-enter-page';
import {Md5} from "ts-md5/dist/md5";
import { ConfigModel } from '../model/config.model';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MessageService } from '../service/message.service';

declare var BMap;
@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage extends OnEnterPage {
    tasksList: any;
    num: any;
    title: string;
    content: string;
    messageId: string;
    params_info: any;
    public userId:string;
    test: string;
    init: boolean; // 标识是否是第一次加载
    default_img: string;
    gps_city: any;
    gps_x: any;
    gps_y: any;

    city: any;
    msg: any;
    wode_renwu_count: any;
    is_refresh: any;
    init_login: any;
    constructor(
        @Host() @Inject(forwardRef(() => RenwuPage)) public app: RenwuPage,
        private messageService: MessageService,
        public mytaskmodel: MyTasksModel,
        private cdr: ChangeDetectorRef,
        public router: Router,
        public route: ActivatedRoute,
        public taskmodel: TasksModel,
        public toolsmodel: ToolsModel,
        public httpClient: HttpClient,
        public localstorage: LocalStorageModel,
        public loginmodel: LoginModel,
        public modalCtrl: ModalController,
        public JpushUtilModel: JpushUtilModel,
        public loadingCtrl: LoadingController,
        public nav: NavController,
        public Md5: Md5,
        public geolocation: Geolocation,
        public androidPermissions: AndroidPermissions,
           ) {
        super(router);
        this.tasksList = '';
        this.matchUrl = ['/default','/default/renwu','/default/renwu/pickables'];
        this.init = true;
        this.default_img = "../../assets/img/ls.png";
        this.is_refresh = false;
        setInterval(() => {
            // 极光允许推送后发送信息，接收 刷新
            // this.get_weidu_xiaoxi();
            this.messageService.message$.subscribe(is_refresh => this.is_refresh = is_refresh);
            // console.log('刷新任务列表');
            // alert(this.is_refresh)
           if (this.is_refresh) {
               this.taskmodel.getAllTasks().then(res => {
                   let ress: any = res;
                   console.log(res, 'res 33333333333333333333333333333');
                   if (ress.error == '0') {
                       this.tasksList = ress.body;
                       this.num = ress.body.length;
                       this.cdr.markForCheck();
                       this.cdr.detectChanges();
                       // console.log(this.tasksList, 'index index this.tasksListthis.tasksList');
                   } else {
                       this.tasksList = '';
                   }
               });
           }
        }, 2000);
        }

    async ngOnInit() {
        super.ngOnInit();

    }
    // 离开页面的时候触发
    ionViewDidLeave() {
        this.init = false;
        this.init_login = false;
    }

    // 上面数组内链接跳转触发
    onEnter() {
        console.log('进入index页面');
        this.reload_page();
    }

    // 第一次进来页面和重新加载的数据
    async reload_page() {
        // console.log(this.init, 'this.initthis.init');
        // await super.showLoading(this.loadingCtrl, ' 加载中...');
        await this.loginmodel.LoginSessionT().then(res => {
            let login_info:any = res;
            // console.log(login_info, 'login_info88888888888888888888888888888');
            if (login_info.error != '0') {
                // this.router.navigateByUrl('/home');
                // return;
            }
            // this.JpushUtilModel.setAlias('');
            // if (this.toolsmodel.isAndroids()) {
            //     /*消息推送配置**/
            //     // this.JpushUtilModel.setAlias(Md5.hashStr('*&#$=zb147' + login_info.body.id).toString()); // 设置别名
            //     // console.log(Md5.hashStr('*&#$=zb147' + login_info.body.id).toString(), '别名别名');
            //     // this.JpushUtilModel.setAlias(login_info.body.id);    // 设置别名
            // }
        });
        setTimeout(() => {     // 定时器
            this.taskmodel.getAllTasks().then(res => {
                let ress: any = res;
                // console.log(res, 'res 33333333333333333333333333333');
                if (ress.error == '0') {
                    this.tasksList = ress.body;
                    this.num = ress.body.length;
                    this.cdr.markForCheck();
                    this.cdr.detectChanges();
                    // console.log(this.tasksList, 'index index this.tasksListthis.tasksList');
                } else {
                    this.tasksList = '';
                }
            });
        }, 1000 );

        // await this.taskmodel.getAllTasks().then(res => {
        //     let ress:any = res;
        //     console.log(res, 'res 33333333333333333333333333333');
        //     if (ress.error == '0') {
        //         this.tasksList = ress.body;
        //         this.num = ress.body.length;
        //         this.cdr.markForCheck();
        //         this.cdr.detectChanges();
        //         console.log(this.tasksList, 'index index this.tasksListthis.tasksList');
        //     } else {
        //         this.tasksList = '';
        //     }
        // });
        await this.loadingCtrl.dismiss();
    }

    // 页面之间切换 出发e079bb9bfbd68d3a490430fef57a2286
    // e079bb9bfbd68d3a490430fef57a2286
    ionViewDidEnter() {
        // console.log('进入首页面');
        // console.log(this.router.url);
        // alert(JSON.stringify(this.router.url))
        if (!this.init) {
            console.log('ionViewDidEnter index');
            // alert('123')
            this.reload_page();

        }
    }
    async open_con(tid, status) {
        const modal = await this.modalCtrl.create(
            {
                component: RenwuConPage,
                componentProps: {
                    'tid': tid,
                    'status': status
                }
            }
        );
        modal.onDidDismiss().then( res => {
            this.reload_page();
            this.get_wode_renwu();  // index 中走的是返回刷新 index_tab中走的是切换刷新
          });
        await  modal.present();
    }
    get_wode_renwu() {
        this.mytaskmodel.getWoDeTaskCount().subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            console.log(ress, 'ress00000000000000000000');
            if (ress.error == '0') {
                // console.log(ress, 'renwu ress00000000000000000000');
                this.wode_renwu_count = ress.body;
                this.app.wode_renwu_count =  this.wode_renwu_count; // 将任务总数传递给任务(父页面)，刷新总数
            } else {
                this.wode_renwu_count = '0';
            }
        });
    }
}
