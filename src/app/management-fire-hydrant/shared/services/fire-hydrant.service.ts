import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {FireHydrant} from '../models/fire-hydrant.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<FireHydrant[]>(this.apiUrl + 'FireHydrant', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(fireHydrant: FireHydrant) {
        return this.http.post(
            this.apiUrl + 'FireHydrant',
            JSON.stringify(fireHydrant),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idFireHydrant: string) {
        return this.http.delete(this.apiUrl + 'FireHydrant/' + idFireHydrant, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
