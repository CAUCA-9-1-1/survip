import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Region} from '../models/region.model';

@Injectable()
export class RegionService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get('region').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(region: Region) {
        return this.http.post(
            'region',
            JSON.stringify(region)
        );
    }

    public update(region: Region) {
        return this.http.put(
            'region',
            JSON.stringify(region)
        );
    }

    public remove(idRegion: string) {
        return this.http.delete('region/' + idRegion);
    }
}
