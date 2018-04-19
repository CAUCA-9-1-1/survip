import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {LaneGenericCode} from '../models/lane-generic-code.model';


@Injectable()
export class LaneGenericCodeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<LaneGenericCode[]>(this.apiUrl + 'LaneGenericCode', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
