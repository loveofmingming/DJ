import { Component, OnInit } from '@angular/core';
import { LoginModel, ToolsModel} from '../model';
import { Clipboard } from '@ionic-native/clipboard/ngx';   // 复制插件
import { AlertController, ActionSheetController , ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-yijian-fankui',
  templateUrl: './yijian-fankui.page.html',
  styleUrls: ['./yijian-fankui.page.scss'],
})
export class YijianFankuiPage implements OnInit {

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public loginmodel: LoginModel,
    public toolsmodel:ToolsModel,
    public router: Router,
    public clipboard: Clipboard
  ) { }

  ngOnInit() {
    
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
          this.router.navigateByUrl('/home');
          return;
      }else{
        // this.getUserInfo();
      }
    }); // 登陆验证
      // this.loginmodel.LoginSession(); // 登陆验证
  }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle',
        });
        toast.present();
    }

  // 复制
  async fuzhiWeixin(msg) {
    const alert = await this.alertController.create({
      header: '微信',
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '复制内容',
          cssClass: 'sure',
          handler: () => {
            this.clipboard.copy( msg );
            this.presentToast('复制成功')
              // 粘贴
            this.clipboard.paste().then(
              (resolve: string) => {
                // alert (resolve) ;
                // console.log(resolve);
              },
              (reject: string) => {
                // alert('Error: ' + reject);
                // console.log('Error: ' + reject);
              }
            );
            // 清除内容
            // this.clipboard.clear();
            // console.log('已复制到剪切板');
          }
        }
      ]
    });
    return await alert.present();
  }
    // this.clipboard.copy(content);
    // // 粘贴
    //   this.clipboard.paste().then(
    //     (resolve: string) => {
    //         alert(resolve);
    //       },
    //       (reject: string) => {
    //         alert('Error: ' + reject);
    //       }
    //     );
    //   //清除内容
    //   this.clipboard.clear();
}
