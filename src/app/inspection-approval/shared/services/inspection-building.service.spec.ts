import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingService } from './inspection-building.service';

describe('InspectionBuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingService]
    });
  });

  it('should be created', inject([InspectionBuildingService], (service: InspectionBuildingService) => {
    expect(service).toBeTruthy();
  }));
});
