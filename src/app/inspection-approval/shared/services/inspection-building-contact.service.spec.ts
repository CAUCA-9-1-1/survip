import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {InspectionBuildingContactService} from './inspection-building-contact.service';


describe('InspectionBuildingContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [InspectionBuildingContactService]
        });
    });

    it('should be created', inject([InspectionBuildingContactService], (service: InspectionBuildingContactService) => {
        expect(service).toBeTruthy();
    }));
});
