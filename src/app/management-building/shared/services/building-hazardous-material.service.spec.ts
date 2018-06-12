import { TestBed, inject } from '@angular/core/testing';

import { BuildingHazardousMaterialService } from './building-hazardous-material.service';

describe('InspectionBuildingHazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingHazardousMaterialService]
    });
  });

  it('should be created', inject([BuildingHazardousMaterialService], (service: BuildingHazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
