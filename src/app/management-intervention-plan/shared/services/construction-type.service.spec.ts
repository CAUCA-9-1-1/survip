import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { ConstructionTypeService } from './construction-type.service';

describe('ConstructionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ConstructionTypeService]
    });
  });

  it('should ...', inject([ConstructionTypeService], (service: ConstructionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
