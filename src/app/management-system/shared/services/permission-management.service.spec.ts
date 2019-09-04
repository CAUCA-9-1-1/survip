import { TestBed } from '@angular/core/testing';

import { PermissionManagementService } from './permission-management.service';

describe('PermissionManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionManagementService = TestBed.get(PermissionManagementService);
    expect(service).toBeTruthy();
  });
});
