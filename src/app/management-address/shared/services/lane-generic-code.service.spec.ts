import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {LaneGenericCodeService} from './lane-generic-code.service';


describe('LaneGenericCodeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [LaneGenericCodeService]
        });
    });

    it('should be created', inject([LaneGenericCodeService], (service: LaneGenericCodeService) => {
        expect(service).toBeTruthy();
    }));
});
