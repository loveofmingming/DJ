import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuConPage } from './renwu-con.page';

describe('RenwuConPage', () => {
  let component: RenwuConPage;
  let fixture: ComponentFixture<RenwuConPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuConPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuConPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
