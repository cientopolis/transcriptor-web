import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeBuilderComponent } from './scheme-builder.component';

describe('SchemeBuilderComponent', () => {
  let component: SchemeBuilderComponent;
  let fixture: ComponentFixture<SchemeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
