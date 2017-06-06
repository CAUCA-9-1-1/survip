import {TestBed, inject} from '@angular/core/testing';
import {TestModule} from '../../../test.module';

import {BuildingService} from './building.service';

describe('BuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [BuildingService]
    });
  });

  it('should ...', inject([BuildingService], (service: BuildingService) => {
    expect(service).toBeTruthy();
  }));
});
