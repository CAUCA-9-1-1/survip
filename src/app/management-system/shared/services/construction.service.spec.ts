import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {ConstructionService} from './construction.service';


describe('ConstructionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [ConstructionService]
        });
    });

    it('should be created', inject([ConstructionService], (service: ConstructionService) => {
        expect(service).toBeTruthy();
    }));
});
