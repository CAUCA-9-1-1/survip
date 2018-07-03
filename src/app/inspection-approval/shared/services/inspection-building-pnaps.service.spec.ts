import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingPnapsService} from './inspection-building-pnaps.service';


describe('InspectionBuildingPnapsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingPnapsService]
        });
    });

    it('should be created', inject([InspectionBuildingPnapsService], (service: InspectionBuildingPnapsService) => {
        expect(service).toBeTruthy();
    }));
});
