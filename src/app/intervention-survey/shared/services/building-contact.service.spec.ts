import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from '../../../shared/shared.module';
import { BuildingContactService } from './building-contact.service';

describe('BuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      providers: [BuildingContactService]
    });
  });

  it('should ...', inject([BuildingContactService], (service: BuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
