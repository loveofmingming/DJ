import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodeGengduoPage } from './wode-gengduo.page';

describe('WodeGengduoPage', () => {
  let component: WodeGengduoPage;
  let fixture: ComponentFixture<WodeGengduoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodeGengduoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodeGengduoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
