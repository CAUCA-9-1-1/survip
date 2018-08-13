import { TestBed, inject } from '@angular/core/testing';

import { InspectionFireHydrantService } from './inspection-fire-hydrant.service';

describe('InspectionFireHydrantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionFireHydrantService]
    });
  });

  it('should be created', inject([InspectionFireHydrantService], (service: InspectionFireHydrantService) => {
    expect(service).toBeTruthy();
  }));
});
