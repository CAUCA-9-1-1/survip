import { TestBed, inject } from '@angular/core/testing';

import { InspectionBuildingContactService } from './inspection-building-contact.service';

describe('InspectionBuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionBuildingContactService]
    });
  });

  it('should be created', inject([InspectionBuildingContactService], (service: InspectionBuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
