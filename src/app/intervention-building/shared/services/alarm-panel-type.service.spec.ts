import { TestBed, inject } from '@angular/core/testing';

import { AlarmPanelTypeService } from './alarm-panel-type.service';

describe('AlarmPanelTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmPanelTypeService]
    });
  });

  it('should ...', inject([AlarmPanelTypeService], (service: AlarmPanelTypeService) => {
    expect(service).toBeTruthy();
  }));
});
