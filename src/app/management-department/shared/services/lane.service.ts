import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Lane} from '../models/lane.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class LaneService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Lane[]> {
        return this.get('Lane');
    }

    localized(): Observable<Lane[]> {
        return this.get('Lane/localized');
    }

    getAllOfCity(idCity: string): Observable<Lane[]> {
        return this.get('Lane/City/' + idCity);
    }

    save(lane: Lane) {
        return this.post('Lane', lane);
    }

    remove(idLane: string) {
        return this.delete('Lane/' + idLane);
    }
}
