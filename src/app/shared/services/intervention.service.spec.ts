import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { InterventionService } from './intervention.service';
import { InspectionService } from './inspection.service';

describe('InterventionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [
        InterventionService,
        InspectionService
      ],
    });
  });

  it('should ...', inject(
      [InterventionService], (service: InterventionService) => {

    expect(service).toBeTruthy();
  }));
});
