import { TestBed, inject } from '@angular/core/testing';

import { LanePublicCodeService } from './lane-public-code.service';

describe('LanePublicCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanePublicCodeService]
    });
  });

  it('should be created', inject([LanePublicCodeService], (service: LanePublicCodeService) => {
    expect(service).toBeTruthy();
  }));
});
