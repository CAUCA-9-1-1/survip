import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {DashboardService} from './dashboard.service';


describe('DashboardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [DashboardService]
        });
    });

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));
});
