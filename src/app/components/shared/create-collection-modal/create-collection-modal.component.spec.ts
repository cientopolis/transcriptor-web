import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionModalComponent } from './create-collection-modal.component';

describe('CreateCollectionModalComponent', () => {
  let component: CreateCollectionModalComponent;
  let fixture: ComponentFixture<CreateCollectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
