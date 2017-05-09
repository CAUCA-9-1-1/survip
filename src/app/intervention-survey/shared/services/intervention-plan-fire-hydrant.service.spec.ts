import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanFireHydrantService } from './intervention-plan-fire-hydrant.service';

describe('InterventionPlanFireHydrantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionPlanFireHydrantService]
    });
  });

  it('should ...', inject([InterventionPlanFireHydrantService], (service: InterventionPlanFireHydrantService) => {
    expect(service).toBeTruthy();
  }));
});
