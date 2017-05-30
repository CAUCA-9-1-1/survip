import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {FireSafetyDepartmentService} from './firesafetydepartment.service';

describe('FireSafetyDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ FireSafetyDepartmentService ]
    });
  });

  it('should ...', inject([FireSafetyDepartmentService], (service: FireSafetyDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
