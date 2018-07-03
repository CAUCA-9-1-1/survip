import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingAnomalyService} from './inspection-building-anomaly.service';


describe('InspectionBuildingAnomalyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingAnomalyService]
        });
    });

    it('should be created', inject([InspectionBuildingAnomalyService], (service: InspectionBuildingAnomalyService) => {
        expect(service).toBeTruthy();
    }));
});
