import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { BuildingContactService } from './building-contact.service';

describe('BuildingContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [BuildingContactService]
    });
  });

  it('should ...', inject([BuildingContactService], (service: BuildingContactService) => {
    expect(service).toBeTruthy();
  }));
});
