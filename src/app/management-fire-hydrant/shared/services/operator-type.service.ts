import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {OperatorType} from '../models/operator-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class OperatorTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<OperatorType[]>(this.apiUrl + 'OperatorType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(operator: OperatorType) {
        return this.http.post(
            this.apiUrl + 'OperatorType',
            JSON.stringify(operator),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idOperator: string) {
        return this.http.delete(this.apiUrl + 'OperatorType/' + idOperator, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
