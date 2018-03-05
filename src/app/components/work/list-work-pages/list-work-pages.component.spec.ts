import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkPagesComponent } from './list-work-pages.component';

describe('ListWorkPagesComponent', () => {
  let component: ListWorkPagesComponent;
  let fixture: ComponentFixture<ListWorkPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
