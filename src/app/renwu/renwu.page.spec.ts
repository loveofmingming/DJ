import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuPage } from './renwu.page';

describe('RenwuPage', () => {
  let component: RenwuPage;
  let fixture: ComponentFixture<RenwuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
