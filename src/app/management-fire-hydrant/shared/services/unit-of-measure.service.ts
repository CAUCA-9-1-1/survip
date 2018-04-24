import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {UnitOfMeasure} from '../models/unit-of-measure.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class UnitOfMeasureService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<UnitOfMeasure[]>(this.apiUrl + 'UnitOfMeasure', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(unit: UnitOfMeasure) {
        return this.http.post(
            this.apiUrl + 'UnitOfMeasure',
            JSON.stringify(unit),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idUnitOfMeasure: string) {
        return this.http.delete(this.apiUrl + 'UnitOfMeasure/' + idUnitOfMeasure, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
