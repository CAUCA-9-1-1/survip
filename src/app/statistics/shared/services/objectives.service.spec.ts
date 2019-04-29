import {TestBed, inject} from '@angular/core/testing';
import {ObjectivesService} from './objectives.service';

describe('ObjectivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectivesService]
    });
  });

  it('should be created', inject([ObjectivesService], (service: ObjectivesService) => {
    expect(service).toBeTruthy();
  }));
});
