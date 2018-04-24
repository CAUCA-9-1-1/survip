import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {FireHydrantType} from '../models/fire-hydrant-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<FireHydrantType[]>(this.apiUrl + 'FireHydrantType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(type: FireHydrantType) {
        return this.http.post(
            this.apiUrl + 'FireHydrantType',
            JSON.stringify(type),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idType: string) {
        return this.http.delete(this.apiUrl + 'FireHydrantType/' + idType, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
