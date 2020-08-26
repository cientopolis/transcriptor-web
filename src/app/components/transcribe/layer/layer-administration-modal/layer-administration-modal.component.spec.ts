import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerAdministrationModalComponent } from './layer-administration-modal.component';

describe('LayerAdministrationModalComponent', () => {
  let component: LayerAdministrationModalComponent;
  let fixture: ComponentFixture<LayerAdministrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerAdministrationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerAdministrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
