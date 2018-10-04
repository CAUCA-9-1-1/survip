import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module.spec';
import { InspectionStatusService } from './inspection-status.service';

describe('InspectionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [InspectionStatusService]
    });
  });

  it('should ...', inject([InspectionStatusService], (service: InspectionStatusService) => {
    expect(service).toBeTruthy();
  }));
});
