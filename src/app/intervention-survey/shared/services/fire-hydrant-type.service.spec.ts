import { TestBed, inject } from '@angular/core/testing';

import { FireHydrantTypeService } from './fire-hydrant-type.service';

describe('FireHydrantTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireHydrantTypeService]
    });
  });

  it('should ...', inject([FireHydrantTypeService], (service: FireHydrantTypeService) => {
    expect(service).toBeTruthy();
  }));
});
