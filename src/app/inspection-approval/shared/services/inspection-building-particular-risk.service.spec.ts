import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingParticularRiskService } from './inspection-building-particular-risk.service';

describe('InspectionBuildingParticularRiskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingParticularRiskService]
    });
  });

  it('should be created', inject([InspectionBuildingParticularRiskService], (service: InspectionBuildingParticularRiskService) => {
    expect(service).toBeTruthy();
  }));
});
