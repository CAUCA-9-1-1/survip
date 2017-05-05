import { TestBed, inject } from '@angular/core/testing';

import { InspectionQuestionService } from './inspection-question.service';

describe('InspectionQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionQuestionService]
    });
  });

  it('should ...', inject([InspectionQuestionService], (service: InspectionQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
