import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../test.module.spec';
import {AuthGuardService} from './auth-guard.service';


describe('AuthGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [AuthGuardService]
        });
    });

    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
        expect(service).toBeTruthy();
    }));
});
