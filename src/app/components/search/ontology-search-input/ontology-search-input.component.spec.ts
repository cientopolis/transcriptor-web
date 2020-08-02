import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologySearchInputComponent } from './ontology-search-input.component';

describe('OntologySearchInputComponent', () => {
  let component: OntologySearchInputComponent;
  let fixture: ComponentFixture<OntologySearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologySearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologySearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
