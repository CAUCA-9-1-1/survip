import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../../test.module';
import { UtilisationCodeService } from './utilisation-code.service';

describe('UtilisationCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [UtilisationCodeService]
    });
  });

  it('should ...', inject([UtilisationCodeService], (service: UtilisationCodeService) => {
    expect(service).toBeTruthy();
  }));
});
