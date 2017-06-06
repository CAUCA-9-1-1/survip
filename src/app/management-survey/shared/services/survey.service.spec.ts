import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {SurveyService} from './survey.service';

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [SurveyService]
    });
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
