import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuGuoqiPage } from './renwu-guoqi.page';

describe('RenwuGuoqiPage', () => {
  let component: RenwuGuoqiPage;
  let fixture: ComponentFixture<RenwuGuoqiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuGuoqiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuGuoqiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
