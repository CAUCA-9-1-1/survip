import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


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

    getCapacity() {
        return this.http.get<UnitOfMeasure[]>(this.apiUrl + 'UnitOfMeasure/capacity', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getDimension() {
        return this.http.get<UnitOfMeasure[]>(this.apiUrl + 'UnitOfMeasure/dimension', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getPressure() {
        return this.http.get<UnitOfMeasure[]>(this.apiUrl + 'UnitOfMeasure/pressure', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getRate() {
        return this.http.get<UnitOfMeasure[]>(this.apiUrl + 'UnitOfMeasure/rate', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
