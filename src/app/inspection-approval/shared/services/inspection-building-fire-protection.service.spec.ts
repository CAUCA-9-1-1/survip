import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingFireProtectionService } from './inspection-building-fire-protection.service';

describe('InspectionBuildingFireProtectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingFireProtectionService]
    });
  });

  it('should be created', inject([InspectionBuildingFireProtectionService], (service: InspectionBuildingFireProtectionService) => {
    expect(service).toBeTruthy();
  }));
});
