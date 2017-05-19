import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {PersonRequiringAssistanceTypeService} from './person-requiring-assistance-type.service';

describe('PersonRequiringAssistanceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PersonRequiringAssistanceTypeService]
    });
  });

  it('should ...', inject([PersonRequiringAssistanceTypeService], (service: PersonRequiringAssistanceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
