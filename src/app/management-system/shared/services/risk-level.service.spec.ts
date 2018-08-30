import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {RiskLevelService} from './risk-level.service';


describe('RiskLevelService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [RiskLevelService]
        });
    });

    it('should ...', inject([RiskLevelService], (service: RiskLevelService) => {
        expect(service).toBeTruthy();
    }));
});
