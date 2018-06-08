import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingPnapsService } from './inspection-building-pnaps.service';

describe('InspectionBuildingPnapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingPnapsService]
    });
  });

  it('should be created', inject([InspectionBuildingPnapsService], (service: InspectionBuildingPnapsService) => {
    expect(service).toBeTruthy();
  }));
});
