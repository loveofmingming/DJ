import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuanyuwomenPage } from './guanyuwomen.page';

describe('GuanyuwomenPage', () => {
  let component: GuanyuwomenPage;
  let fixture: ComponentFixture<GuanyuwomenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuanyuwomenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuanyuwomenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
