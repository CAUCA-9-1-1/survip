import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module.spec';
import { AddressLocationTypeService } from './address-location-type.service';

describe('LocationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [AddressLocationTypeService]
    });
  });

  it('should ...', inject([AddressLocationTypeService], (service: AddressLocationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
