import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceContainerComponent } from './reference-container.component';

describe('ReferenceContainerComponent', () => {
  let component: ReferenceContainerComponent;
  let fixture: ComponentFixture<ReferenceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
