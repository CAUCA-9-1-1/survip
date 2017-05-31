import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {PermissionWebuserService} from './permissionwebuser.service';

describe('PermissionWebuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ PermissionWebuserService]
    });
  });

  it('should ...', inject([PermissionWebuserService], (service: PermissionWebuserService) => {
    expect(service).toBeTruthy();
  }));
});
