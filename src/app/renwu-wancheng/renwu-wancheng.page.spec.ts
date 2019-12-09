import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuWanchengPage } from './renwu-wancheng.page';

describe('RenwuWanchengPage', () => {
  let component: RenwuWanchengPage;
  let fixture: ComponentFixture<RenwuWanchengPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuWanchengPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuWanchengPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
