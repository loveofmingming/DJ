import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.page.html',
  styleUrls: ['./permission.page.scss'],
})
export class PermissionPage implements OnInit {

  constructor(
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  back() {
    this.modalCtrl.dismiss();
    // this.router.navigateByUrl('default/renwu/pickables');
  }
}
