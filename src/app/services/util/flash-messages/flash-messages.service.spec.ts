import { TestBed, inject } from '@angular/core/testing';

import { FlashMessagesService } from './flash-messages.service';

describe('FlashMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashMessagesService]
    });
  });

  it('should be created', inject([FlashMessagesService], (service: FlashMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
