import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {City} from '../models/city.model';

@Injectable()
export class CityService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get('city').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(city: City) {
        return this.http.post(
            'city',
            JSON.stringify(city)
        );
    }

    public update(city: City) {
        return this.http.put(
            'city',
            JSON.stringify(city),
        );
    }

    public remove(idCity: string) {
        return this.http.delete('city/' + idCity);
    }
}
