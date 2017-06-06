import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {ApisActionService} from './apisaction.service';


describe('ApisActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ ApisActionService ]
    });
  });

  it('should ...', inject([ApisActionService], (service: ApisActionService) => {
    expect(service).toBeTruthy();
  }));
});
