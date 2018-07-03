import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {QuestionService} from './question.service';

describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [QuestionService]
    });
  });

  it('should ...', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
