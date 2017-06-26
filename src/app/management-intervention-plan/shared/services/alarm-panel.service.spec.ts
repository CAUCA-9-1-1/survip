import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { AlarmPanelService } from './alarm-panel.service';

describe('AlarmPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [AlarmPanelService]
    });
  });

  it('should ...', inject([AlarmPanelService], (service: AlarmPanelService) => {
    expect(service).toBeTruthy();
  }));
});
