import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {FireSafetyDepartment} from '../models/firesafetydepartment.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireSafetyDepartmentService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<FireSafetyDepartment[]>(this.apiUrl + 'FireSafetyDepartment', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(department: FireSafetyDepartment) {
        return this.http.post(
            this.apiUrl + 'FireSafetyDepartment',
            JSON.stringify(department),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idDepartment: string) {
        return this.http.delete(this.apiUrl + 'FireSafetyDepartment/' + idDepartment, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
