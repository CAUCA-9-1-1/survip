import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Lane} from '../models/lane.model';

@Injectable()
export class LaneService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get('lane').pipe(
            map((result) => {
                return result['data'];
            })
        );
    }

    public create(lane: Lane) {
        return this.http.post(
            'lane',
            JSON.stringify(lane)
        );
    }

    public update(lane: Lane) {
        return this.http.put(
            'lane',
            JSON.stringify(lane),
        );
    }

    public remove(idLane: string) {
        return this.http.delete('lane/' + idLane);
    }
}
