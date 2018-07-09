import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingParticularRiskService} from './inspection-building-particular-risk.service';


describe('InspectionBuildingParticularRiskService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingParticularRiskService]
        });
    });

    it('should be created', inject([InspectionBuildingParticularRiskService], (service: InspectionBuildingParticularRiskService) => {
        expect(service).toBeTruthy();
    }));
});
