import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRelationshipsComponent } from './select-relationships.component';

describe('SelectRelationshipsComponent', () => {
  let component: SelectRelationshipsComponent;
  let fixture: ComponentFixture<SelectRelationshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRelationshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
