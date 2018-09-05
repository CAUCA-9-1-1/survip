import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {PersonRequiringAssistanceTypeService} from './person-requiring-assistance-type.service';


describe('PersonRequiringAssistanceTypeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [PersonRequiringAssistanceTypeService]
        });
    });

    it('should ...', inject([PersonRequiringAssistanceTypeService], (service: PersonRequiringAssistanceTypeService) => {
        expect(service).toBeTruthy();
    }));
});
