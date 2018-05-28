import {Injectable, Injector} from '@angular/core';
import {RequestService} from '../../../shared/services/request.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FireSafetyDepartmentRiskLevel} from '../models/fire-safety-department-risk-level.model';

@Injectable()
export class FireSafetyDepartmentRiskLevelService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<FireSafetyDepartmentRiskLevel[]>(this.apiUrl + 'FireSafetyDepartmentRiskLevel', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(ssi: FireSafetyDepartmentRiskLevel) {
        return this.http.post(
            this.apiUrl + 'FireSafetyDepartmentRiskLevel',
            JSON.stringify(ssi),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idFireSafetyDepartmentRiskLevel: string) {
        return this.http.delete(this.apiUrl + 'FireSafetyDepartmentRiskLevel/' + idFireSafetyDepartmentRiskLevel, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
