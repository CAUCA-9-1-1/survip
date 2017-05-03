import { TestBed, inject } from '@angular/core/testing';

import { BuildingContactService } from './building-contact.service';

describe('BuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingContactService]
    });
  });

  it('should ...', inject([BuildingContactService], (service: BuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
