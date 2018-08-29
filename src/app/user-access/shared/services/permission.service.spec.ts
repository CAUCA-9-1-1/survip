import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {PermissionService} from './permission.service';


describe('PermissionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [PermissionService]
        });
    });

    it('should ...', inject([PermissionService], (service: PermissionService) => {
        expect(service).toBeTruthy();
    }));
});
