import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {CountryService} from './country.service';


describe('CountryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CountryService]
        });
    });

    it('should ...', inject([CountryService], (service: CountryService) => {
        expect(service).toBeTruthy();
    }));
});
