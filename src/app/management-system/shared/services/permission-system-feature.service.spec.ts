import { TestBed, inject } from '@angular/core/testing';

import { PermissionSystemFeatureService } from './permission-system-feature.service';

describe('PermissionSystemFeatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionSystemFeatureService]
    });
  });

  it('should be created', inject([PermissionSystemFeatureService], (service: PermissionSystemFeatureService) => {
    expect(service).toBeTruthy();
  }));
});
