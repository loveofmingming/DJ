import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuTongguoPage } from './renwu-tongguo.page';

describe('RenwuTongguoPage', () => {
  let component: RenwuTongguoPage;
  let fixture: ComponentFixture<RenwuTongguoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuTongguoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuTongguoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
