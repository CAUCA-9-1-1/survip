import { TestBed, inject } from '@angular/core/testing';

import { LocationTypeService } from './location-type.service';
import {TestModule} from '../../../test.module';

describe('LocationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [LocationTypeService]
    });
  });

  it('should ...', inject([LocationTypeService], (service: LocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
