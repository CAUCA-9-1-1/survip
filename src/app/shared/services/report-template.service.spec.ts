import { TestBed, inject } from '@angular/core/testing';

import { ReportTemplateService } from './report-template.service';

describe('ReportTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTemplateService]
    });
  });

  it('should be created', inject([ReportTemplateService], (service: ReportTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
