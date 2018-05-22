import { TestBed, inject } from '@angular/core/testing';

import { PictureService } from './picture.service';

describe('PictureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PictureService]
    });
  });

  it('should be created', inject([PictureService], (service: PictureService) => {
    expect(service).toBeTruthy();
  }));
});
