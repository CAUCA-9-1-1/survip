import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingService} from './inspection-building.service';


describe('InspectionBuildingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingService]
        });
    });

    it('should be created', inject([InspectionBuildingService], (service: InspectionBuildingService) => {
        expect(service).toBeTruthy();
    }));
});
