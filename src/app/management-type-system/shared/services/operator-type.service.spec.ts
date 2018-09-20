import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module.spec';
import { OperatorTypeService } from './operator-type.service';

describe('OperatorTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [OperatorTypeService]
    });
  });

  it('should ...', inject([OperatorTypeService], (service: OperatorTypeService) => {
    expect(service).toBeTruthy();
  }));
});
