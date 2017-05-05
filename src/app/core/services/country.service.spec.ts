import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { CountryService } from './country.service';
import { SharedModule } from '../../shared/shared.module';

describe('CountryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ CountryService ]
    });
  });

  it('should ...', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));
});
