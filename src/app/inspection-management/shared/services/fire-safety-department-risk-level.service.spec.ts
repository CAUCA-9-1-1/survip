import { TestBed, inject } from '@angular/core/testing';

import { FireSafetyDepartmentRiskLevelService } from './fire-safety-department-risk-level.service';

describe('FireSafetyDepartmentRiskLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireSafetyDepartmentRiskLevelService]
    });
  });

  it('should be created', inject([FireSafetyDepartmentRiskLevelService], (service: FireSafetyDepartmentRiskLevelService) => {
    expect(service).toBeTruthy();
  }));
});
