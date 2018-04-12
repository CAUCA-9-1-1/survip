import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {CityType} from '../models/citytype.model';

@Injectable()
export class CityTypeService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get('citytype').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(cityType: CityType) {
        return this.http.post(
            'citytype',
            JSON.stringify(cityType)
        );
    }

    public update(cityType: CityType) {
        return this.http.put(
            'citytype',
            JSON.stringify(cityType),
        );
    }

    public remove(idCityType: string) {
        return this.http.delete('citytype/' + idCityType);
    }
}
