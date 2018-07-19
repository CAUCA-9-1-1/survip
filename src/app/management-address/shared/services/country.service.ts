import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Country} from '../models/country.model';


@Injectable()
export class CountryService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Country[]> {
        return this.get('Country');
    }

    localized(): Observable<Country[]> {
        return this.get('Country/localized');
    }

    save(country: Country) {
        return this.post('Country', country);
    }

    remove(idCountry: string) {
        return this.delete('Country/' + idCountry);
    }
}
