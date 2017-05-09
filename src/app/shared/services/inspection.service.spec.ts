import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { InspectionService } from './inspection.service';

describe('InspectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [InspectionService]
    });
  });

  it('should ...', inject([InspectionService], (service: InspectionService) => {
    expect(service).toBeTruthy();
  }));
});
