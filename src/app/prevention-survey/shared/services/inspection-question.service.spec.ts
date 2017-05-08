import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { InspectionQuestionService } from './inspection-question.service';

describe('InspectionQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [InspectionQuestionService]
    });
  });

  it('should ...', inject([InspectionQuestionService], (service: InspectionQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
