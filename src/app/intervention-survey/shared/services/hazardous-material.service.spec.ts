import { TestBed, inject } from '@angular/core/testing';

import { HazardousMaterialService } from './hazardous-material.service';
import {HttpModule} from '@angular/http';

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
