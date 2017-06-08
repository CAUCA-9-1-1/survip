import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {WebuserFireSafetyDepartmentService} from './webuserfiresafetydepartment.service';

describe('WebuserFireSafetyDepartmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ WebuserFireSafetyDepartmentService ]
    });
  });

  it('should ...', inject([WebuserFireSafetyDepartmentService], (service: WebuserFireSafetyDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
