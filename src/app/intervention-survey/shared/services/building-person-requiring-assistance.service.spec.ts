import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {BuildingPersonRequiringAssistanceService} from './building-person-requiring-assistance.service';

describe('BuildingPersonRequiringAssistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BuildingPersonRequiringAssistanceService]
    });
  });

  it('should ...', inject([BuildingPersonRequiringAssistanceService], (service: BuildingPersonRequiringAssistanceService) => {
    expect(service).toBeTruthy();
  }));
});
