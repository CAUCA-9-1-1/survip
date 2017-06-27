import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { FireHydrantService } from './fire-hydrant.service';

describe('ConnectionTypeService', () => {
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
