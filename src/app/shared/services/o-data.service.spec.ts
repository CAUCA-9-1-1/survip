import { TestBed, inject } from '@angular/core/testing';

import { ODataService } from './o-data.service';

describe('ODataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ODataService]
    });
  });

  it('should be created', inject([ODataService], (service: ODataService) => {
    expect(service).toBeTruthy();
  }));
});
