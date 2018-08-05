import { TestBed, inject } from '@angular/core/testing';

import { PageVersionService } from './page-version.service';

describe('PageVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageVersionService]
    });
  });

  it('should be created', inject([PageVersionService], (service: PageVersionService) => {
    expect(service).toBeTruthy();
  }));
});
