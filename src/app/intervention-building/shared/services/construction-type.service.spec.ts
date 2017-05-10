import { TestBed, inject } from '@angular/core/testing';

import { ConstructionTypeService } from './construction-type.service';

describe('ConstructionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructionTypeService]
    });
  });

  it('should ...', inject([ConstructionTypeService], (service: ConstructionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
