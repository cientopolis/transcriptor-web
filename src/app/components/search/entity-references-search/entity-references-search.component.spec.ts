import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityReferencesSearchComponent } from './entity-references-search.component';

describe('EntityReferencesSearchComponent', () => {
  let component: EntityReferencesSearchComponent;
  let fixture: ComponentFixture<EntityReferencesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityReferencesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityReferencesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
