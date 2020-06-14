import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSemanticRelationshipComponent } from './search-semantic-relationship.component';

describe('SearchSemanticRelationshipComponent', () => {
  let component: SearchSemanticRelationshipComponent;
  let fixture: ComponentFixture<SearchSemanticRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSemanticRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSemanticRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
