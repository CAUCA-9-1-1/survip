import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {BuildingContactService} from './building-contact.service';

describe('BuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BuildingContactService]
    });
  });

  it('should ...', inject([BuildingContactService], (service: BuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
