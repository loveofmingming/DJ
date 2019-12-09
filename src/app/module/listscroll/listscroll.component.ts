// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-listscroll',
//   templateUrl: './listscroll.component.html',
//   styleUrls: ['./listscroll.component.scss']
// })
// export class ListscrollComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
import { Component, OnInit, Input, ElementRef, ViewChild , } from '@angular/core';
// declare let BScroll;
import BScroll from 'better-scroll';
@Component({
    selector: 'app-listscroll',
    templateUrl: './listscroll.component.html',
    styleUrls: ['./listscroll.component.scss']
})
export class ListscrollComponent implements OnInit {

    @ViewChild('scroll',{ static: true }) scrollEl: ElementRef;
    @Input()
    private height: number;

    public scroll;
    constructor() { }

    ngOnInit() {
// 设置高度
        this.scrollEl.nativeElement.style.height = `${this.height}px`;
// 初始化
        setTimeout(() => {
            this.scroll = new BScroll(this.scrollEl.nativeElement, {click: true});
        }, 20);
     }

   }