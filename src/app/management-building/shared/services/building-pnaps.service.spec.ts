import { TestBed, inject } from '@angular/core/testing';

import { BuildingPnapsService } from './building-pnaps.service';

describe('InspectionBuildingPnapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingPnapsService]
    });
  });

  it('should be created', inject([BuildingPnapsService], (service: BuildingPnapsService) => {
    expect(service).toBeTruthy();
  }));
});
