import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {LaneService} from './lane.service';

describe('LaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LaneService]
    });
  });

  it('should ...', inject([LaneService], (service: LaneService) => {
    expect(service).toBeTruthy();
  }));
});
