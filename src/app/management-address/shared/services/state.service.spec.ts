import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {StateService} from './state.service';


describe('StateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [StateService]
        });
    });

    it('should ...', inject([StateService], (service: StateService) => {
        expect(service).toBeTruthy();
    }));
});
