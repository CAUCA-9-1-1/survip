import { TestBed, inject } from '@angular/core/testing';

import { InterventionPlanFireHydrantService } from './intervention-plan-fire-hydrant.service';
import {TestModule} from '../../../test.module';

describe('InterventionPlanFireHydrantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [InterventionPlanFireHydrantService]
    });
  });

  it('should ...', inject([InterventionPlanFireHydrantService], (service: InterventionPlanFireHydrantService) => {
    expect(service).toBeTruthy();
  }));
});
