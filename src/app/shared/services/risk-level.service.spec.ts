import { TestBed, inject } from '@angular/core/testing';

import { RiskLevelService } from './risk-level.service';

describe('RiskLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiskLevelService]
    });
  });

  it('should ...', inject([RiskLevelService], (service: RiskLevelService) => {
    expect(service).toBeTruthy();
  }));
});
