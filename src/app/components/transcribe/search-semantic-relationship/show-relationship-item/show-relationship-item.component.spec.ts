import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRelationshipItemComponent } from './show-relationship-item.component';

describe('ShowRelationshipItemComponent', () => {
  let component: ShowRelationshipItemComponent;
  let fixture: ComponentFixture<ShowRelationshipItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRelationshipItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRelationshipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
