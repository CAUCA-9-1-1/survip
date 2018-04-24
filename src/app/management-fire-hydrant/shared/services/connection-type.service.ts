import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {ConnectionType} from '../models/connection-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class ConnectionTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<ConnectionType[]>(this.apiUrl + 'ConnectionType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(type: ConnectionType) {
        return this.http.post(
            this.apiUrl + 'ConnectionType',
            JSON.stringify(type),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idType: string) {
        return this.http.delete(this.apiUrl + 'ConnectionType/' + idType, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
