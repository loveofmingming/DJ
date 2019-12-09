import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YijianFankuiPage } from './yijian-fankui.page';

describe('YijianFankuiPage', () => {
  let component: YijianFankuiPage;
  let fixture: ComponentFixture<YijianFankuiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YijianFankuiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YijianFankuiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
