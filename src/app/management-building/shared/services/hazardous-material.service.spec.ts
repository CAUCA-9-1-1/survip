import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { HazardousMaterialService } from './hazardous-material.service';

describe('HazardousMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [HazardousMaterialService]
    });
  });

  it('should ...', inject([HazardousMaterialService], (service: HazardousMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
