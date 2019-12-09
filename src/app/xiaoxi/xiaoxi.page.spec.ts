import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiaoxiPage } from './xiaoxi.page';

describe('XiaoxiPage', () => {
  let component: XiaoxiPage;
  let fixture: ComponentFixture<XiaoxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiaoxiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiaoxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
