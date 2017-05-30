import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {WebuserService} from './webuser.service';

describe('WebuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [ WebuserService ]
    });
  });

  it('should ...', inject([WebuserService], (service: WebuserService) => {
    expect(service).toBeTruthy();
  }));
});
