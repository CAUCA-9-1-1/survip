import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Lane} from '../models/lane.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class LaneService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Lane[]>(this.apiUrl + 'Lane', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getAllOfCity(idCity: string) {
        return this.http.get<Lane[]>(this.apiUrl + 'Lane/City/' + idCity, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(lane: Lane) {
        return this.http.post(
            this.apiUrl + 'Lane',
            JSON.stringify(lane),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idLane: string) {
        return this.http.delete(this.apiUrl + 'Lane/' + idLane, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
