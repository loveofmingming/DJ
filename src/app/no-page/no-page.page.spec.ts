import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPagePage } from './no-page.page';

describe('NoPagePage', () => {
  let component: NoPagePage;
  let fixture: ComponentFixture<NoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
