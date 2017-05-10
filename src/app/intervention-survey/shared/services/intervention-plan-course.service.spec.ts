import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanCourseService } from './intervention-plan-course.service';

describe('InterventionPlanCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionPlanCourseService]
    });
  });

  it('should ...', inject([InterventionPlanCourseService], (service: InterventionPlanCourseService) => {
    expect(service).toBeTruthy();
  }));
});
