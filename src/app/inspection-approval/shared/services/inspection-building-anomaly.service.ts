import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {RequestService} from '../../../shared/services/request.service';

@Injectable()
export class InspectionBuildingAnomalyService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getBuildingAnomaly(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/anomaly', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getPictures(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/anomaly/' + id + '/picture', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
