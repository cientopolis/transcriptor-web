import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionFormComponent } from './transcription-form.component';

describe('TranscriptionFormComponent', () => {
  let component: TranscriptionFormComponent;
  let fixture: ComponentFixture<TranscriptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
