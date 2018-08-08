import { TestBed, inject } from '@angular/core/testing';

import { InspectionCourseService } from './inspection-course.service';

describe('InspectionCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionCourseService]
    });
  });

  it('should be created', inject([InspectionCourseService], (service: InspectionCourseService) => {
    expect(service).toBeTruthy();
  }));
});
