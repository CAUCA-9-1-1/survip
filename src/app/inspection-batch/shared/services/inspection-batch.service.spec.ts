import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBatchService} from './inspection-batch.service';


describe('InspectionBatchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBatchService]
        });
    });

    it('should be created', inject([InspectionBatchService], (service: InspectionBatchService) => {
        expect(service).toBeTruthy();
    }));
});
