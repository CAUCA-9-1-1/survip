import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {FirestationService} from './firestation.service';


describe('FirestationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [FirestationService]
        });
    });

    it('should be created', inject([FirestationService], (service: FirestationService) => {
        expect(service).toBeTruthy();
    }));
});
