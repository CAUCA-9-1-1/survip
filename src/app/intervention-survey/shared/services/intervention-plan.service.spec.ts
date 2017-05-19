import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {InterventionPlanService} from './intervention-plan.service';

describe('InterventionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InterventionPlanService]
    });
  });

  it('should ...', inject([InterventionPlanService], (service: InterventionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
