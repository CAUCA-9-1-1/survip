import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {FireSafetyDepartmentRiskLevelService} from './fire-safety-department-risk-level.service';


describe('FireSafetyDepartmentRiskLevelService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [FireSafetyDepartmentRiskLevelService]
        });
    });

    it('should be created', inject([FireSafetyDepartmentRiskLevelService], (service: FireSafetyDepartmentRiskLevelService) => {
        expect(service).toBeTruthy();
    }));
});
