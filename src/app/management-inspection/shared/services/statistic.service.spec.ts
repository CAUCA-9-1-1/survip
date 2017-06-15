import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {StatisticService} from './statistic.service';

describe('StatisticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ StatisticService ]
    });
  });

  it('should ...', inject([StatisticService], (service: StatisticService) => {
    expect(service).toBeTruthy();
  }));
});
