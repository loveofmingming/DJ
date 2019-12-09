import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwuZuorenwuPage } from './renwu-zuorenwu.page';

describe('RenwuZuorenwuPage', () => {
  let component: RenwuZuorenwuPage;
  let fixture: ComponentFixture<RenwuZuorenwuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwuZuorenwuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwuZuorenwuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
