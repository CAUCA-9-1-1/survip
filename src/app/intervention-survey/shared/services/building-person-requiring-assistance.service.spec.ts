import { TestBed, inject } from '@angular/core/testing';

import { BuildingPersonRequiringAssistanceService } from './building-person-requiring-assistance.service';

describe('BuildingPersonRequiringAssistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingPersonRequiringAssistanceService]
    });
  });

  it('should ...', inject([BuildingPersonRequiringAssistanceService], (service: BuildingPersonRequiringAssistanceService) => {
    expect(service).toBeTruthy();
  }));
});
