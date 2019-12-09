import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangdingshoujiPage } from './bangdingshouji.page';

describe('BangdingshoujiPage', () => {
  let component: BangdingshoujiPage;
  let fixture: ComponentFixture<BangdingshoujiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangdingshoujiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangdingshoujiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
