import { TestBed, inject } from '@angular/core/testing';

import { InspectionBatchService } from './inspection-batch.service';

describe('InspectionBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBatchService]
    });
  });

  it('should be created', inject([InspectionBatchService], (service: InspectionBatchService) => {
    expect(service).toBeTruthy();
  }));
});
