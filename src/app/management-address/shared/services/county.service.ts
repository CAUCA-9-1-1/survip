import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {County} from '../models/county.model';

@Injectable()
export class CountyService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get('county').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(county: County) {
        return this.http.post(
            'county',
            JSON.stringify(county)
        );
    }

    public update(county: County) {
        return this.http.put(
            'county',
            JSON.stringify(county),
        );
    }

    public remove(idCounty: string) {
        return this.http.delete('county/' + idCounty);
    }
}
