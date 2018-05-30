import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingAnomalyService } from './inspection-building-anomaly.service';

describe('InspectionBuildingAnomalyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingAnomalyService]
    });
  });

  it('should be created', inject([InspectionBuildingAnomalyService], (service: InspectionBuildingAnomalyService) => {
    expect(service).toBeTruthy();
  }));
});
