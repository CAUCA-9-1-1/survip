import {TestBed, inject} from '@angular/core/testing';

import {TestModule} from '../../../test.module.spec';
import {CityTypeService} from './citytype.service';


describe('CityTypeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CityTypeService]
        });
    });

    it('should ...', inject([CityTypeService], (service: CityTypeService) => {
        expect(service).toBeTruthy();
    }));
});
