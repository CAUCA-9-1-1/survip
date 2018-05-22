import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class InspectionBuildingParticularRiskService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getFloor(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/particularrisk/floor', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getFoundation(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/particularrisk/foundation', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getRoof(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/particularrisk/roof', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getWall(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/particularrisk/wall', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getPictures(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/particularrisk/' + id + '/picture', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
