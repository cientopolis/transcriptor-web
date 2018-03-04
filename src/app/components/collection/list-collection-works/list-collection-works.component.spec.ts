import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollectionWorksComponent } from './list-collection-works.component';

describe('ListCollectionWorksComponent', () => {
  let component: ListCollectionWorksComponent;
  let fixture: ComponentFixture<ListCollectionWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCollectionWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCollectionWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
