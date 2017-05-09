import { TestBed, inject } from '@angular/core/testing';

import { UnitOfMeasureService } from './unit-of-measure.service';
import {TestModule} from '../../../test.module';

describe('UnitOfMeasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [UnitOfMeasureService]
    });
  });

  it('should ...', inject([UnitOfMeasureService], (service: UnitOfMeasureService) => {
    expect(service).toBeTruthy();
  }));
});
