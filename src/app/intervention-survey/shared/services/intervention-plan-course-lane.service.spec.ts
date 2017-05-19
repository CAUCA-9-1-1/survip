import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {InterventionPlanCourseLaneService} from './intervention-plan-course-lane.service';

describe('InterventionPlanCourseLaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InterventionPlanCourseLaneService]
    });
  });

  it('should ...', inject([InterventionPlanCourseLaneService], (service: InterventionPlanCourseLaneService) => {
    expect(service).toBeTruthy();
  }));
});
