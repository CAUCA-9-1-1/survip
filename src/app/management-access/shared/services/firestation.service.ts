import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {Firestation} from '../models/firestation.model';


@Injectable()
export class FirestationService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Firestation[]>(this.apiUrl + 'Firestation', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(station: Firestation) {
        return this.http.post(
            this.apiUrl + 'Firestation',
            JSON.stringify(station),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idStation: string) {
        return this.http.delete(this.apiUrl + 'Firestation/' + idStation, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
