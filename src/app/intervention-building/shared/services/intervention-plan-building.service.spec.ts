import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {InterventionPlanBuildingService} from './intervention-plan-building.service';

describe('InterventionPlanBuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [InterventionPlanBuildingService]
    });
  });

  it('should ...', inject([InterventionPlanBuildingService], (service: InterventionPlanBuildingService) => {
    expect(service).toBeTruthy();
  }));
});
