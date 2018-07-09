import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {CountyService} from './county.service';


describe('CountyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CountyService]
        });
    });

    it('should ...', inject([CountyService], (service: CountyService) => {
        expect(service).toBeTruthy();
    }));
});
