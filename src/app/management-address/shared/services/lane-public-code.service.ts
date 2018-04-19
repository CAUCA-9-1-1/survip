import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {LanePublicCode} from '../models/lane-public-code.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class LanePublicCodeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<LanePublicCode[]>(this.apiUrl + 'LanePublicCode', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
