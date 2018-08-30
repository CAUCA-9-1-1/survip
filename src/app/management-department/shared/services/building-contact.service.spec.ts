import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {BuildingContactService} from './building-contact.service';


describe('InspectionBuildingContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [BuildingContactService]
        });
    });

    it('should be created', inject([BuildingContactService], (service: BuildingContactService) => {
        expect(service).toBeTruthy();
    }));
});
