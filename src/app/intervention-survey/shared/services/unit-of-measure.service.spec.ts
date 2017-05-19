import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {UnitOfMeasureService} from './unit-of-measure.service';

describe('UnitOfMeasureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UnitOfMeasureService]
    });
  });

  it('should ...', inject([UnitOfMeasureService], (service: UnitOfMeasureService) => {
    expect(service).toBeTruthy();
  }));
});
