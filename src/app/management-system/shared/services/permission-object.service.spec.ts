import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {PermissionObjectService} from './permission-object.service';


describe('PermissionObjectService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [PermissionObjectService]
        });
    });

    it('should ...', inject([PermissionObjectService], (service: PermissionObjectService) => {
        expect(service).toBeTruthy();
    }));
});
