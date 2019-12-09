import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(
      private modalCtrl: ModalController,
      public router: Router,
  ) { }

  ngOnInit() {
  }
  back() {
    this.modalCtrl.dismiss();
    // this.router.navigateByUrl('default/renwu/pickables');
  }
}
