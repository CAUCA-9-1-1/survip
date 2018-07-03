import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {RiskLevel} from '../models/risk-level.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class RiskLevelService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<RiskLevel[]>(this.apiUrl + 'RiskLevel', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    localized() {
        return this.http.get<RiskLevel[]>(this.apiUrl + 'RiskLevel/localized', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(level: RiskLevel) {
        return this.http.post(
            this.apiUrl + 'RiskLevel',
            JSON.stringify(level),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idLevel: string) {
        return this.http.delete(this.apiUrl + 'RiskLevel/' + idLevel, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
