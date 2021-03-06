import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module.spec';
import { FireHydrantService } from '../../../management-department/shared/services/fire-hydrant.service';

describe('FireHydrantConnectionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [FireHydrantService]
    });
  });

  it('should ...', inject([FireHydrantService], (service: FireHydrantService) => {
    expect(service).toBeTruthy();
  }));
});
