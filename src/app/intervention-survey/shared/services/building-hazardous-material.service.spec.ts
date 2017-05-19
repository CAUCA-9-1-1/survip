import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {BuildingHazardousMaterialService} from './building-hazardous-material.service';

describe('BuildingHazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BuildingHazardousMaterialService
      ]
    });
  });

  it('should ...', inject([BuildingHazardousMaterialService], (service: BuildingHazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
