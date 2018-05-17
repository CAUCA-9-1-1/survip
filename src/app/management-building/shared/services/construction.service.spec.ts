import { TestBed, inject } from '@angular/core/testing';

import { ConstructionService } from './construction.service';

describe('ConstructionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructionService]
    });
  });

  it('should be created', inject([ConstructionService], (service: ConstructionService) => {
    expect(service).toBeTruthy();
  }));
});
