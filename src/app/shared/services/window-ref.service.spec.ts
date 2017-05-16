import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {WindowRefService} from './window-ref.service';

describe('WindowRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [WindowRefService]
    });
  });

  it('should ...', inject([WindowRefService], (service: WindowRefService) => {
    expect(service).toBeTruthy();
  }));
});
