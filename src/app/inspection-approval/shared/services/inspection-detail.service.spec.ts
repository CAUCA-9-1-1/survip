import { TestBed, inject } from '@angular/core/testing';

import { InspectionDetailService } from './inspection-detail.service';

describe('InspectionDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionDetailService]
    });
  });

  it('should be created', inject([InspectionDetailService], (service: InspectionDetailService) => {
    expect(service).toBeTruthy();
  }));
});
