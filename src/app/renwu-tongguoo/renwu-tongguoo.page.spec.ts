import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuTongguooPage } from './renwu-tongguoo.page';

describe('RenwuTongguooPage', () => {
  let component: RenwuTongguooPage;
  let fixture: ComponentFixture<RenwuTongguooPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuTongguooPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuTongguooPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
