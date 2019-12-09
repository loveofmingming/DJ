import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiaojinkuPage } from './xiaojinku.page';

describe('XiaojinkuPage', () => {
  let component: XiaojinkuPage;
  let fixture: ComponentFixture<XiaojinkuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiaojinkuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiaojinkuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
