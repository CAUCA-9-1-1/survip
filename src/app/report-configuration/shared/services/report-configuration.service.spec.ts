import { TestBed, inject } from '@angular/core/testing';

import { ReportConfigurationService } from './report-configuration.service';

describe('ReportConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportConfigurationService]
    });
  });

  it('should be created', inject([ReportConfigurationService], (service: ReportConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
