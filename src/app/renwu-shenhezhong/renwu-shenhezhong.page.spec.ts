import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuShenhezhongPage } from './renwu-shenhezhong.page';

describe('RenwuShenhezhongPage', () => {
  let component: RenwuShenhezhongPage;
  let fixture: ComponentFixture<RenwuShenhezhongPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuShenhezhongPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuShenhezhongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
