import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../model/config.model';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router';
import {HomePage} from '../home/home.page';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage {
  init_login: any = false;
  constructor(
      public router: Router,
      public modalCtrl: ModalController,
  ) {
  }
  ngOnInit() {
    console.log('第一次');
    // this.init_login = true;
  }
  ionViewWillEnter() {
    console.log('will default');
    if (this.init_login) {
      this.router.navigateByUrl('/home');
    }

  }
  ionViewDidEnter() {
    // this.router.navigateByUrl('/home');
  }
  move() {
        // console.log( 'mo');
        // this.router.navigateByUrl('/default/wode');
        this.router.navigate(['/default/wode']);
        this.router.onSameUrlNavigation = 'reload';
    }
  test() {
    ConfigModel.test = '888';
  }
}
