import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../../../shared/shared.module';
import { LaneService } from './lane.service';

describe('LaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      providers: [ LaneService ]
    });
  });

  it('should ...', inject([LaneService], (service: LaneService) => {
    expect(service).toBeTruthy();
  }));
});
