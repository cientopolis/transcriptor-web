import { TestBed, inject } from '@angular/core/testing';

import { TranscribeService } from './transcribe.service';

describe('TranscribeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranscribeService]
    });
  });

  it('should be created', inject([TranscribeService], (service: TranscribeService) => {
    expect(service).toBeTruthy();
  }));
});
