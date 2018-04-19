import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Webuser } from '../models/webuser.model';
import { RequestService } from '../../../shared/services/request.service';


@Injectable()
export class WebuserService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Webuser[]>(this.apiUrl + 'Webuser', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(webuser: Webuser) {
        return this.http.post(
            this.apiUrl + 'Webuser',
            JSON.stringify(webuser),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idWebuser: string) {
        return this.http.delete(this.apiUrl + 'Webuser/' + idWebuser, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
