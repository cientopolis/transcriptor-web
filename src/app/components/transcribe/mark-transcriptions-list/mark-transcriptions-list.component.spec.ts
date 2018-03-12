import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTranscriptionsListComponent } from './mark-transcriptions-list.component';

describe('MarkTranscriptionsListComponent', () => {
  let component: MarkTranscriptionsListComponent;
  let fixture: ComponentFixture<MarkTranscriptionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkTranscriptionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTranscriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
