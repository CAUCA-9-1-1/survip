import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module.spec';
import { LocationTypeService } from './location-type.service';

describe('LocationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [LocationTypeService]
    });
  });

  it('should ...', inject([LocationTypeService], (service: LocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
