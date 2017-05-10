import { TestBed, inject } from '@angular/core/testing';

import { FirestationService } from './firestation.service';

describe('FirestationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestationService]
    });
  });

  it('should ...', inject([FirestationService], (service: FirestationService) => {
    expect(service).toBeTruthy();
  }));
});
