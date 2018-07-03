import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {RegionService} from './region.service';


describe('RegionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [RegionService]
        });
    });

    it('should ...', inject([RegionService], (service: RegionService) => {
        expect(service).toBeTruthy();
    }));
});
