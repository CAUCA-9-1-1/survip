import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { AlarmPanelTypeService } from './alarm-panel-type.service';

describe('AlarmPanelTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [AlarmPanelTypeService]
    });
  });

  it('should ...', inject([AlarmPanelTypeService], (service: AlarmPanelTypeService) => {
    expect(service).toBeTruthy();
  }));
});
