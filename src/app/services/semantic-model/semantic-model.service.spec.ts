import { TestBed } from '@angular/core/testing';

import { SemanticModelService } from './semantic-model.service';

describe('SemanticModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemanticModelService = TestBed.get(SemanticModelService);
    expect(service).toBeTruthy();
  });
});
