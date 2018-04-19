import { TestBed, inject } from '@angular/core/testing';

import { LaneGenericCodeService } from './lane-generic-code.service';

describe('LaneGenericCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaneGenericCodeService]
    });
  });

  it('should be created', inject([LaneGenericCodeService], (service: LaneGenericCodeService) => {
    expect(service).toBeTruthy();
  }));
});
