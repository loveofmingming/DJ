import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTabPage } from './index-tab.page';

describe('IndexTabPage', () => {
  let component: IndexTabPage;
  let fixture: ComponentFixture<IndexTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
