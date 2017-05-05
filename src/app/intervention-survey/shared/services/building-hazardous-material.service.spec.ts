import { TestBed, inject } from '@angular/core/testing';

import { BuildingHazardousMaterialService } from './building-hazardous-material.service';

describe('BuildingHazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingHazardousMaterialService]
    });
  });

  it('should ...', inject([BuildingHazardousMaterialService], (service: BuildingHazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
