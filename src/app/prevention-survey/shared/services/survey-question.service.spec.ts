import { TestBed, inject } from '@angular/core/testing';

import { SurveyQuestionService } from './survey-question.service';

describe('SurveyQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyQuestionService]
    });
  });

  it('should ...', inject([SurveyQuestionService], (service: SurveyQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
