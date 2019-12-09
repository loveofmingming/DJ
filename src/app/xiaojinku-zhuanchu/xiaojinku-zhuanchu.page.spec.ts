import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiaojinkuZhuanchuPage } from './xiaojinku-zhuanchu.page';

describe('XiaojinkuZhuanchuPage', () => {
  let component: XiaojinkuZhuanchuPage;
  let fixture: ComponentFixture<XiaojinkuZhuanchuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiaojinkuZhuanchuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiaojinkuZhuanchuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
