import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticTranscriptionDetailsComponent } from './semantic-transcription-details.component';

describe('SemanticTranscriptionDetailsComponent', () => {
  let component: SemanticTranscriptionDetailsComponent;
  let fixture: ComponentFixture<SemanticTranscriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticTranscriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticTranscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
