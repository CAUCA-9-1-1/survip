import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { FireHydrantTypeService } from './fire-hydrant-type.service';

describe('FireHydrantTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FireHydrantTypeService]
    });
  });

  it('should ...', inject([FireHydrantTypeService], (service: FireHydrantTypeService) => {
    expect(service).toBeTruthy();
  }));
});
