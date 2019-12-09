import { Component, OnInit } from '@angular/core';
import { LoginModel} from '../model';

@Component({
  selector: 'app-guanyuwomen',
  templateUrl: './guanyuwomen.page.html',
  styleUrls: ['./guanyuwomen.page.scss'],
})
export class GuanyuwomenPage implements OnInit {

  constructor(
    public loginmodel: LoginModel
  ) { }

  ngOnInit() {
      this.loginmodel.LoginSession(); // 登陆验证
  }

}
