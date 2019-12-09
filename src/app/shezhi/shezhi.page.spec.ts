import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShezhiPage } from './shezhi.page';

describe('ShezhiPage', () => {
  let component: ShezhiPage;
  let fixture: ComponentFixture<ShezhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShezhiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShezhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
