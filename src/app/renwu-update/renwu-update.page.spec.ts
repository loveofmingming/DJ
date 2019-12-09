import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuUpdatePage } from './renwu-update.page';

describe('RenwuUpdatePage', () => {
  let component: RenwuUpdatePage;
  let fixture: ComponentFixture<RenwuUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
