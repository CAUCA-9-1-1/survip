import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingHazardousMaterialService} from './inspection-building-hazardous-material.service';


describe('InspectionBuildingHazardousMaterialService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingHazardousMaterialService]
        });
    });

    it('should be created', inject([InspectionBuildingHazardousMaterialService], (service: InspectionBuildingHazardousMaterialService) => {
        expect(service).toBeTruthy();
    }));
});
