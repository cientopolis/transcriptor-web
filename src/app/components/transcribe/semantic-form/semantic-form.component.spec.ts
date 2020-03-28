import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticFormComponent } from './semantic-form.component';

describe('SemanticFormComponent', () => {
  let component: SemanticFormComponent;
  let fixture: ComponentFixture<SemanticFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
