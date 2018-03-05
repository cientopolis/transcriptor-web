import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from '../http/http.service';
import { FlashMessagesService } from '../util/flash-messages/flash-messages.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { MzToastService } from 'ng2-materialize';

import { WorkService } from './work.service';
import { WorkMockResponse } from './mock/work-mock-response'

describe('WorkService', () => {
  let injector;
  let service: WorkService;
  let httpMock: HttpTestingController;
  
  
  afterEach(() => {
    httpMock.verify();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkService, HttpService, SimpleGlobal, FlashMessagesService, MzToastService]
    });
    
    injector = getTestBed();
    service = injector.get(WorkService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([WorkService], (service: WorkService) => {
    expect(service).toBeTruthy();
  }));
  
  describe('#get', () => {
    it('should return a work', () => {
      const dummyResponse:any = WorkMockResponse.get(2);
      
      service.get(2).subscribe(work => {
        expect(work.id).toBe(2);
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/work/2`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });
  
  describe('#delete', () => {
    it('should return a work', () => {
      const dummyResponse:any = WorkMockResponse.delete(2);
      
      service.delete(2).subscribe(work => {
        expect(work.id).toBe(2);
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/work/2`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyResponse);
    });
  });
  
  describe('#edit', () => {
    it('should return a work', () => {
      const dummyResponse:any = WorkMockResponse.edit(2);
      
      const workToUpdate = {
          id: 2,
          title: "anotherName",
          description: "work",
          collection_id: 3,
          slug:"anotherName"
      }
      
      service.edit(workToUpdate).subscribe(work => {
        expect(work.id).toBe(2);
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/work/2`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyResponse);
    });
  });
  
  describe('#listPages', () => {
    it('should return an array of pages', () => {
      const dummyResponse:any = WorkMockResponse.listPages(2);
      
      service.listPages(2).subscribe(pages => {
        expect(pages.length).toBe(4);
      });
      const req = httpMock.expectOne(`http://localhost:3000/api/work/2/pages`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });
});
