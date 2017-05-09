import { TestBed, inject } from '@angular/core/testing';

import { LocationTypeService } from './location-type.service';

describe('LocationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationTypeService]
    });
  });

  it('should ...', inject([LocationTypeService], (service: LocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
