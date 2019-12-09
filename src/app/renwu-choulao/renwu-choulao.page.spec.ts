import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuChoulaoPage } from './renwu-choulao.page';

describe('RenwuChoulaoPage', () => {
  let component: RenwuChoulaoPage;
  let fixture: ComponentFixture<RenwuChoulaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuChoulaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuChoulaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
