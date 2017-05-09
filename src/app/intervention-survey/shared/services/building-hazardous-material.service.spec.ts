import { TestBed, inject } from '@angular/core/testing';

import { BuildingHazardousMaterialService } from './building-hazardous-material.service';
import {HttpModule} from '@angular/http';

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
