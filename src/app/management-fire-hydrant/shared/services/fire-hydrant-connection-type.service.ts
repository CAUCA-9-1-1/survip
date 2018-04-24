import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {FireHydrantConnectionType} from '../models/fire-hydrant-connection-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantConnectionTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<FireHydrantConnectionType[]>(this.apiUrl + 'FireHydrantConnectionType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(type: FireHydrantConnectionType) {
        return this.http.post(
            this.apiUrl + 'FireHydrantConnectionType',
            JSON.stringify(type),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idType: string) {
        return this.http.delete(this.apiUrl + 'FireHydrantConnectionType/' + idType, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
