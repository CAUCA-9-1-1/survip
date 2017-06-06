import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {ChoiceService} from './choice.service';

describe('ChoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ChoiceService]
    });
  });

  it('should ...', inject([ChoiceService], (service: ChoiceService) => {
    expect(service).toBeTruthy();
  }));
});
