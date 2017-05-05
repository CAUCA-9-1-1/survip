import { TestBed, inject } from '@angular/core/testing';

import { LaneService } from './lane.service';

describe('LaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaneService]
    });
  });

  it('should ...', inject([LaneService], (service: LaneService) => {
    expect(service).toBeTruthy();
  }));
});
