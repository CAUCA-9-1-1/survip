import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {LocationTypeService} from './location-type.service';

describe('LocationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LocationTypeService]
    });
  });

  it('should ...', inject([LocationTypeService], (service: LocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
