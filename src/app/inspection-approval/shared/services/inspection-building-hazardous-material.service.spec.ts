import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingHazardousMaterialService } from './inspection-building-hazardous-material.service';

describe('InspectionBuildingHazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingHazardousMaterialService]
    });
  });

  it('should be created', inject([InspectionBuildingHazardousMaterialService], (service: InspectionBuildingHazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
