import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { DialogsService } from './dialogs.service';

describe('DialogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [DialogsService]
    });
  });

  it('should ...', inject([DialogsService], (service: DialogsService) => {
    expect(service).toBeTruthy();
  }));
});
