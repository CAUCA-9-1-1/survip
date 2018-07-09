import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {LaneService} from './lane.service';


describe('LaneService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [LaneService]
        });
    });

    it('should ...', inject([LaneService], (service: LaneService) => {
        expect(service).toBeTruthy();
    }));
});
