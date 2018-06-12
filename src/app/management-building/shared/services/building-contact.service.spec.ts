import { TestBed, inject } from '@angular/core/testing';

import { BuildingContactService } from './building-contact.service';

describe('InspectionBuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingContactService]
    });
  });

  it('should be created', inject([BuildingContactService], (service: BuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
