import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuWeitongguoPage } from './renwu-weitongguo.page';

describe('RenwuWeitongguoPage', () => {
  let component: RenwuWeitongguoPage;
  let fixture: ComponentFixture<RenwuWeitongguoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuWeitongguoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuWeitongguoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
