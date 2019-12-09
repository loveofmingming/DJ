import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XinyuzhiPage } from './xinyuzhi.page';

describe('XinyuzhiPage', () => {
  let component: XinyuzhiPage;
  let fixture: ComponentFixture<XinyuzhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XinyuzhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XinyuzhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
