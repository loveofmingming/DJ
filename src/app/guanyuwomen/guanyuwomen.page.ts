import { Component, OnInit } from '@angular/core';
import { LoginModel} from '../model';
import {PermissionPage} from '../permission/permission.page';
import {PrivacyPage} from '../privacy/privacy.page';
import {ModalController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guanyuwomen',
  templateUrl: './guanyuwomen.page.html',
  styleUrls: ['./guanyuwomen.page.scss'],
})
export class GuanyuwomenPage implements OnInit {

  constructor(
    public loginmodel: LoginModel,
    public modalCtrl: ModalController,
    public router: Router,
  ) { }

  ngOnInit() {
      this.loginmodel.LoginSession(); // 登陆验证
  }
  async open_permission() {
    const modal = await this.modalCtrl.create({component: PermissionPage });
    modal.onDidDismiss().then( res => {
      this.router.onSameUrlNavigation = 'reload';
      // alert('回到首页');
    });
    await modal.present();
  }
  async open_privacy() {
    const modal = await this.modalCtrl.create({component: PrivacyPage });
    modal.onDidDismiss().then( res => {
      this.router.onSameUrlNavigation = 'reload';
      // alert('回到首页');
    });
    await modal.present();
  }
}
