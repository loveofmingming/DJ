import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaohangbiPage } from './daohangbi.page';

describe('DaohangbiPage', () => {
  let component: DaohangbiPage;
  let fixture: ComponentFixture<DaohangbiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaohangbiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaohangbiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
