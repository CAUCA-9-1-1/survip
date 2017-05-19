import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {ConstructionTypeService} from './construction-type.service';

describe('ConstructionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ConstructionTypeService]
    });
  });

  it('should ...', inject([ConstructionTypeService], (service: ConstructionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
