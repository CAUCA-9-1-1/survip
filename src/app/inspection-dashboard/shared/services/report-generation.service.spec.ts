import { TestBed, inject } from '@angular/core/testing';

import { ReportGenerationService } from './report-generation.service';

describe('ReportGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportGenerationService]
    });
  });

  it('should be created', inject([ReportGenerationService], (service: ReportGenerationService) => {
    expect(service).toBeTruthy();
  }));
});
