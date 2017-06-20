import {TestBed, inject} from '@angular/core/testing';

import {CordovaService} from './cordova.service';
import {WindowRefService} from 'cause-lib';

describe('CordovaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CordovaService,
        WindowRefService
      ]
    });
  });

  it('should ...', inject([CordovaService], (service: CordovaService) => {
    expect(service).toBeTruthy();
  }));
});
