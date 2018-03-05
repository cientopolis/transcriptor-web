import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FlashMessagesService } from '../util/flash-messages/flash-messages.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { MzToastService } from 'ng2-materialize';

import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, SimpleGlobal, FlashMessagesService, MzToastService]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
