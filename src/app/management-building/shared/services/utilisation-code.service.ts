import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {UtilisationCode} from '../models/utilisation-code.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class UtilisationCodeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<UtilisationCode[]>(this.apiUrl + 'UtilisationCode', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(code: UtilisationCode) {
        return this.http.post(
            this.apiUrl + 'UtilisationCode',
            JSON.stringify(code),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idCode: string) {
        return this.http.delete(this.apiUrl + 'UtilisationCode/' + idCode, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
