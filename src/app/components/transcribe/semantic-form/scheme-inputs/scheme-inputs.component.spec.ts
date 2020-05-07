import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeInputsComponent } from './scheme-inputs.component';

describe('SchemeInputsComponent', () => {
  let component: SchemeInputsComponent;
  let fixture: ComponentFixture<SchemeInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
