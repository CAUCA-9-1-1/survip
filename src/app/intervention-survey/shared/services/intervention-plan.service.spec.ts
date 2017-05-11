import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanService } from './intervention-plan.service';

describe('InterventionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionPlanService]
    });
  });

  it('should ...', inject([InterventionPlanService], (service: InterventionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
