import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {BuildingService} from './building.service';

describe('BuildingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BuildingService]
    });
  });

  it('should ...', inject([BuildingService], (service: BuildingService) => {
    expect(service).toBeTruthy();
  }));
});
