import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { SurveyQuestionService } from './survey-question.service';

describe('SurveyQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [SurveyQuestionService]
    });
  });

  it('should ...', inject([SurveyQuestionService], (service: SurveyQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
