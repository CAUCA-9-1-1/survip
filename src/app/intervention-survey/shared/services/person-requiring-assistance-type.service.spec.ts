import { TestBed, inject } from '@angular/core/testing';

import { PersonRequiringAssistanceTypeService } from './person-requiring-assistance-type.service';

describe('PersonRequiringAssistanceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonRequiringAssistanceTypeService]
    });
  });

  it('should ...', inject([PersonRequiringAssistanceTypeService], (service: PersonRequiringAssistanceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
