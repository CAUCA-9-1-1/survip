import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {PictureService} from './picture.service';

describe('PictureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [PictureService]
    });
  });

  it('should ...', inject([PictureService], (service: PictureService) => {
    expect(service).toBeTruthy();
  }));
});
