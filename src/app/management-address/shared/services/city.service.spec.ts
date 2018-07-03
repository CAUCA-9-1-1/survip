import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {CityService} from './city.service';


describe('CityService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CityService]
        });
    });

    it('should ...', inject([CityService], (service: CityService) => {
        expect(service).toBeTruthy();
    }));
});
