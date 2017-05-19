import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {HazardousMaterialService} from './hazardous-material.service';

describe('HazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HazardousMaterialService
      ]
    });
  });

  it('should ...', inject([HazardousMaterialService], (service: HazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
