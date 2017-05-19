import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {InterventionPlanFireHydrantService} from './intervention-plan-fire-hydrant.service';

describe('InterventionPlanFireHydrantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InterventionPlanFireHydrantService]
    });
  });

  it('should ...', inject([InterventionPlanFireHydrantService], (service: InterventionPlanFireHydrantService) => {
    expect(service).toBeTruthy();
  }));
});
