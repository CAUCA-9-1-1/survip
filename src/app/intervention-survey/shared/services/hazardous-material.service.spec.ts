import { TestBed, inject } from '@angular/core/testing';

import { HazardousMaterialService } from './hazardous-material.service';

describe('HazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HazardousMaterialService]
    });
  });

  it('should ...', inject([HazardousMaterialService], (service: HazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
