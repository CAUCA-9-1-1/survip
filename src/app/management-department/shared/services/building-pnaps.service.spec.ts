import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {BuildingPnapsService} from './building-pnaps.service';


describe('InspectionBuildingPnapsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [BuildingPnapsService]
        });
    });

    it('should be created', inject([BuildingPnapsService], (service: BuildingPnapsService) => {
        expect(service).toBeTruthy();
    }));
});
