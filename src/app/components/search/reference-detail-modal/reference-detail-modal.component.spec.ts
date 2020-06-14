import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDetailModalComponent } from './reference-detail-modal.component';

describe('ReferenceDetailModalComponent', () => {
  let component: ReferenceDetailModalComponent;
  let fixture: ComponentFixture<ReferenceDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
