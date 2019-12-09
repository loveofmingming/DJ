import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NavController} from '@ionic/angular'; 
@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.page.html',
  styleUrls: ['./no-page.page.scss'],
})
export class NoPagePage implements OnInit {
  type:any;
  constructor(
      public route: ActivatedRoute,
      public router:Router,
      public Nav:NavController,
  ) {
    
   }

  ngOnInit() {
    
  }
  relode(){
    this.Nav.back();
  }
}
