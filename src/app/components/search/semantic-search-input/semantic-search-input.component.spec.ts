import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticSearchInputComponent } from './semantic-search-input.component';

describe('SemanticSearchInputComponent', () => {
  let component: SemanticSearchInputComponent;
  let fixture: ComponentFixture<SemanticSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticSearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
