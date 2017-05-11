import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanCourseLaneService } from './intervention-plan-course-lane.service';

describe('InterventionPlanCourseLaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionPlanCourseLaneService]
    });
  });

  it('should ...', inject([InterventionPlanCourseLaneService], (service: InterventionPlanCourseLaneService) => {
    expect(service).toBeTruthy();
  }));
});
