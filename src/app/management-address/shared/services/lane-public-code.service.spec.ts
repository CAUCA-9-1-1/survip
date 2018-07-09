import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {LanePublicCodeService} from './lane-public-code.service';


describe('LanePublicCodeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [LanePublicCodeService]
        });
    });

    it('should be created', inject([LanePublicCodeService], (service: LanePublicCodeService) => {
        expect(service).toBeTruthy();
    }));
});
