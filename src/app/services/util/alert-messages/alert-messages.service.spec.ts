import { TestBed, inject } from '@angular/core/testing';

import { AlertMessagesService } from './alert-messages.service';

describe('AlertMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertMessagesService]
    });
  });

  it('should be created', inject([AlertMessagesService], (service: AlertMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
