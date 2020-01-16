import {  NgZone, Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { TasksModel,ToolsModel,CameraModel,LoginModel,MyTasksModel} from '../model';
import { TasksModel, ToolsModel, CameraModel, LoginModel} from '../model';
import { ConfigModel} from '../model/config.model';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
// import { Router } from '@angular/router';

import {NavController, IonContent ,  } from '@ionic/angular';
import { Content } from '@angular/compiler/src/render3/r3_ast';




// import BScroll from 'better-scroll';

import 'hammerjs';
@Component({
    selector: 'app-renwu-con',
    templateUrl: './renwu-con.page.html',
    styleUrls: ['./renwu-con.page.scss'],
})
export class RenwuConPage implements OnInit {
    // slideOpts = {
    //     initialSlide: 1,
    //     speed: 400
    // };
    // wode_renwu_count:any;
    i: any;
    id: string;
    tasksListCon: any;
    lingquCon: any;
    renwu_con_color: any;
    renwu_con_status: number; // 控制选项卡
    renwu_submit_status: string; // 控制提交按钮
    serve_img_url: string;
    showBigImageState: boolean;
    big_img: string;
    big_img_ti: number;
    big_img_i: number;
    big_img_count: number;
    user_id: any;
    img_i: any;

        @ViewChild(IonContent, {static: false}) contentView: IonContent;

        @ViewChild('searchBox', {static: false}) searchBoxView: ElementRef;

    // @ViewChild('renwupages') tabRef:IonTabs;
    constructor(
        // public mytasksmodel: MyTasksModel,
        public toolsmodel: ToolsModel,
        public route: ActivatedRoute,
        public router: Router,
        public tasks: TasksModel,
        public tools: ToolsModel,
        public camera: CameraModel,
        // public Nav:NavController,
        public loginmodel: LoginModel,
        public alertcontroller: AlertController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public zone: NgZone,
    ) {

        this.serve_img_url = ConfigModel.BASE_IMG_URL;
        // this.id = this.route.snapshot.paramMap.get('id');
        // this.renwu_submit_status = this.route.snapshot.paramMap.get('status');
        this.id = this.navParams.get('tid');
        this.renwu_submit_status = this.navParams.get('status');

        this.tasksListCon = [];
        this.renwu_con_color = [];
        this.showBigImageState = false;
        this.user_id = '';
        this.img_i = 0 ;
    }

    ngOnInit() {
        this.loginmodel.LoginSession().subscribe(res => {
            console.log(res, 'ressssss');
            let login_info:any = this.tools.decodeUrlList(res);
            console.log(login_info, 'login_infologin_infologin_info');
            if (login_info.error != '0') {
                this.router.navigateByUrl('/home');
                return;
            } else {
                // this.getUnserInfo();
                this.user_id = login_info.body.id;
                this.getTasksCon(this.id);
                this.renwu_con_status = 1;
                this.renwu_con_color.renwu_color = 'ffffff';
                this.renwu_con_color.renwu_bgcolor = 'ff6600';
                this.renwu_con_color.xize_color = 'ff6600';
                this.renwu_con_color.xize_bgcolor = 'ffffff';
            }
        }); // 登陆验证

    }
    ionViewDidEnter(): void {
        // window.addEventListener('scroll', this.handleScroll); // 原生监听获取 失败
    }
    // handleScroll() {
    //     // 原生获取都是0
    //     console.log('111111111111111111111111');
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  // 向上滚动的高度
    //     console.log(scrollTop, 'scrollTopscrollTopscrollTopscrollTop');
    //     const offsetTop = document.getElementById('myscroll').offsetTop; // 观察容器距离顶部的高度
    //     console.log(offsetTop, 'offsetTopoffsetTopoffsetTopoffsetTop');
    //     if (scrollTop > offsetTop) {  // 逻辑判断
    //         // this.isFixed = true
    //         console.log('111111111111111111111111');
    //     } else {
    //         // this.isFixed = false
    //         console.log('111111111111111111111111');
    //     }
    // }
    abc() {
        // translate 方法 无效
        // var nowTransform = document.getElementById('tabsubject').getElementsByClassName( 'renwu_dh');
        // // var nowTransform = document.getElementById('tabsubject').scrollTop
        // console.log(nowTransform, 'ppppppppppppppppppppppppppppp');
        // var startIndex = nowTransform.indexOf('(') + 1;
        // console.log(startIndex, 'startIndexstartIndexstartIndex');
        // var endIndex = nowTransform.indexOf(')');
        // console.log(endIndex, 'endIndexendIndexendIndex');
        // var nowTranslate = nowTransform.substring(startIndex, endIndex);
        // console.log(nowTranslate.substring, 'nowTranslatenowTranslatenowTranslate');
        // var translateArr = nowTranslate.split(',');
        // console.log(translateArr, 'translateArrtranslateArrtranslateArr');
        // let myScrollTop = translateArr[1].replace(/-|px/g, '');
        // console.log(myScrollTop);
    };

    scrollHandler(event) { // ion-content 标签中(ionScroll)="scrollHandler($event);" scroll-events="true" 监听到滚动事件
        // this.handleScroll(); // 原生获取都是0
        // let B = ionicScrollDelegate.getScrollPosition().top
        this.zone.run(() => {
            // this.handleScroll(); // 原生获取都是0
            const offsetTop = document.getElementById('myscroll').scrollTop; // 观察容器距离顶部的高度
            console.log( this.contentView.scrollEvents, 'offsetTopoffsetTopoffsetTopoffsetTopoffsetTopoffsetTop');
            console.log(this.searchBoxView.nativeElement.offsetHeight, 'this.searchBoxView.nativeElement.offsetHeight');
            // if (this.contentView.scrollTop > this.searchBoxView.nativeElement.offsetHeight) {
            // 原引用ionic3中的content 有scrollTop 属性，换为IonContent后 没有scrollTop属性了，未能获取到滚动值
            if ( this.contentView.scrollY > this.searchBoxView.nativeElement.offsetHeight) {
                console.log('0000');
                // this.searchBoxView.nativeElement.style.position = 'fixed';
                this.searchBoxView.nativeElement.style.background = 'red';
            } else {
                // this.searchBoxView.nativeElement.style.position = '';
            }
        });
    }

    // getUnserInfo()  {
    //   this.user_id = window.localStorage.getItem('userId');
    // }

    getTasksCon(id){
        let con = {
            id: id
        };
        this.tasks.getTasksCon(con).subscribe(res => {
            let ress:any = this.tools.decodeUrlList(res);
            if(ress.error == '0'){
                this.tasksListCon = ress.body;
                console.log(this.tasksListCon, 'this.tasksListCon000000000000000000000000');
            }

        });
    }

    insertMyTasksCon(id) {
        // this.lingquCon = JSON.stringify({
        //   uid:this.user_id,
        //   tid:id
        // })
        let con = {
            tid: id
        };
        this.tasks.insertMyTasksCon(con).subscribe(res => {
            let in_res:any = res;
            // console.log(in_res,'in_resin_resin_resin_resin_res');
            if (in_res.error != '0') {
                this.onTixing(decodeURIComponent(in_res.body));
                return;
            }
            this.onTixing(decodeURIComponent('任务领取成功!请在24小时内完成任务,过期将被释放。'), '1');
        });
        // this.router.navigate(['default/renwu/mine']);
        // let selTab = this.tabRef.getSelected();
        // this.router.navigateByUrl('/default/renwu/'+selTab);
    }

    renwu_con_qie(state) {
        if (state == 1) {
            this.renwu_con_color.renwu_color = 'ffffff';
            this.renwu_con_color.renwu_bgcolor = 'ff6600';
            this.renwu_con_color.xize_color = 'ff6600';
            this.renwu_con_color.xize_bgcolor = 'ffffff';
        } else {
            this.renwu_con_color.renwu_color = 'ff6600';
            this.renwu_con_color.renwu_bgcolor = 'ffffff';
            this.renwu_con_color.xize_color = 'ffffff';
            this.renwu_con_color.xize_bgcolor = 'ff6600';
        }
        this.renwu_con_status = state;
    }

    hideBigImage() {
        this.showBigImageState = false;
    }
    showBigImage(url) {
        this.big_img = url;
        this.showBigImageState = true;
    }
    showBigImages(i, ti) {
        this.big_img_count = this.tasksListCon.tt_list[i].img_name_https.length;
        // for (var t = 0; t < this.big_img_count - 1; t++) {
        //     console.log(t,'ttttttttttttttttttttttttttt');
        //       return t;
        // }
        // var t = 0;
        // for (;;) {
        //     if (t < this.big_img_count) break;
        //     console.log(t);
        //     t++;
        // }
        this.big_img = this.tasksListCon.tt_list[i].img_name_https[ti];
        this.big_img_i = i;
        this.big_img_ti = ti;
        // this.img_i = 0;
        this.showBigImageState = true;

    }
    swipeEvnet(event) {
        // console.log('进入滑动');
        // 向左滑
        if (event.direction == 2) {
            // console.log('进入左滑动');
            var big_img_ti = this.big_img_ti + 1;
            if (this.tasksListCon.tt_list[this.big_img_i].img_name_https[big_img_ti] ) {
                this.big_img_ti = big_img_ti;
                this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_name_https[this.big_img_ti];
            }
        }

        // 向右滑
        if (event.direction == 4) {
            // console.log('进入右滑动');
            var big_img_ti = this.big_img_ti - 1;
            // console.log(this.tasksListCon.tt_list[this.big_img_i].img_name_https[big_img_ti]);
            if (this.tasksListCon.tt_list[this.big_img_i].img_name_https[big_img_ti]){
                this.big_img_ti = big_img_ti;
                this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_name_https[this.big_img_ti];
            }
        }
    }
    // get_wode_renwu(){
    //     this.mytasksmodel.getWoDeTaskCount().subscribe(res => {
    //         let ress:any = this.toolsmodel.decodeUrlList(res);
    //         if(ress.error == '0'){
    //             console.log(ress.body,'ress.body');
    //             this.wode_renwu_count = ress.body;
    //         }else{
    //             this.wode_renwu_count = '0';
    //         }
    //     });
    // }
    async onTixing( mess, type = '' ) {
        const alert = await this.alertcontroller.create( {
            // enableBackdropDismiss: false,
            backdropDismiss: false,
            message: mess,
            buttons: [
                {
                    text: '返回',
                    cssClass: 'primary',
                    handler: () => {
                        // console.log('点击取消了');
                        this.back();
                    }
                },
                {
                    text: '知道了',
                    cssClass: 'sure',
                    handler: () => {
                        if (type == '1') {
                            // console.log('222');
                            this.back()
                            this.router.navigateByUrl('default/renwu/mine');   // 跳转
                        } else {
                            this.back();
                            this.router.navigateByUrl('default/renwu/mine');   // 跳转
                            // console.log('333');
                            // this.router.navigate(['default/renwu/mine']);

                        }
                    }
                }
            ]
        });
        await alert.present();
    }
    back() {
        // window.history.back();  // 返回
        this.modalCtrl.dismiss();
        // console.log('888888');
    }


}
// export class SlideExample {
//     // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
//     slideOpts = {
//         initialSlide: 1,
//         speed: 400
//     };
//     constructor() {}
// }
