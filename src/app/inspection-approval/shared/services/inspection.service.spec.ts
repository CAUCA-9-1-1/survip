import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionService} from './inspection.service';


describe('DashboardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionService]
        });
    });

    it('should be created', inject([InspectionService], (service: InspectionService) => {
        expect(service).toBeTruthy();
    }));
});
