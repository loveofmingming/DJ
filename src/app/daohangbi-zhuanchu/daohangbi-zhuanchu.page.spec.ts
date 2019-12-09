import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaohangbiZhuanchuPage } from './daohangbi-zhuanchu.page';

describe('DaohangbiZhuanchuPage', () => {
  let component: DaohangbiZhuanchuPage;
  let fixture: ComponentFixture<DaohangbiZhuanchuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaohangbiZhuanchuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaohangbiZhuanchuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
