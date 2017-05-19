import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {InterventionPlanCourseService} from './intervention-plan-course.service';

describe('InterventionPlanCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InterventionPlanCourseService]
    });
  });

  it('should ...', inject([InterventionPlanCourseService], (service: InterventionPlanCourseService) => {
    expect(service).toBeTruthy();
  }));
});
