import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {AlarmPanelTypeService} from './alarm-panel-type.service';

describe('AlarmPanelTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AlarmPanelTypeService]
    });
  });

  it('should ...', inject([AlarmPanelTypeService], (service: AlarmPanelTypeService) => {
    expect(service).toBeTruthy();
  }));
});
