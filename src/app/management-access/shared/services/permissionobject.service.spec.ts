import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {PermissionObjectService} from './permissionobject.service';

describe('PermissionObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ PermissionObjectService ]
    });
  });

  it('should ...', inject([PermissionObjectService], (service: PermissionObjectService) => {
    expect(service).toBeTruthy();
  }));
});
