import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {FirestationService} from './firestation.service';

describe('FirestationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FirestationService]
    });
  });

  it('should ...', inject([FirestationService], (service: FirestationService) => {
    expect(service).toBeTruthy();
  }));
});
