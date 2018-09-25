import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {City} from '../models/city.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CityService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<City[]> {
        return this.get('City');
    }

    geolocation(idCity: string): Observable<City> {
        return this.get('City/' + idCity + '/geolocation');
    }

    localized(): Observable<City[]> {
        return this.get('City/localized');
    }

    save(city: City) {
        return this.post('City', city);
    }

    remove(idCity: string) {
        return this.delete('City/' + idCity);
    }
}
