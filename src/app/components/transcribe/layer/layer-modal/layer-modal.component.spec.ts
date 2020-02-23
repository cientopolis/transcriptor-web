import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerModalComponent } from './layer-modal.component';

describe('LayerModalComponent', () => {
  let component: LayerModalComponent;
  let fixture: ComponentFixture<LayerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
