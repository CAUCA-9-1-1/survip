import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {SurveyService} from './survey.service';

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SurveyService]
    });
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
