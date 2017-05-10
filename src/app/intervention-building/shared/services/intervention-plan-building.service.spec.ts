import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanBuildingService } from './intervention-plan-building.service';

describe('InterventionPlanBuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionPlanBuildingService]
    });
  });

  it('should ...', inject([InterventionPlanBuildingService], (service: InterventionPlanBuildingService) => {
    expect(service).toBeTruthy();
  }));
});
