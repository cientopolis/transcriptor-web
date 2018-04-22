import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionContainerComponent } from './transcription-container.component';

describe('TranscriptionContainerComponent', () => {
  let component: TranscriptionContainerComponent;
  let fixture: ComponentFixture<TranscriptionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
