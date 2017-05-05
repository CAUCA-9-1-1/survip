import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../../../shared/shared.module';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      providers: [ SurveyService ]
    });
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
