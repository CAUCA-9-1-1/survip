import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {BuildingHazardousMaterialService} from './building-hazardous-material.service';


describe('InspectionBuildingHazardousMaterialService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [BuildingHazardousMaterialService]
        });
    });

    it('should be created', inject([BuildingHazardousMaterialService], (service: BuildingHazardousMaterialService) => {
        expect(service).toBeTruthy();
    }));
});
