import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingAnomaly} from '../../../management-building/shared/models/building-anomaly.model';
import {Picture} from '../../../shared/models/picture.model';


@Injectable()
export class InspectionBuildingAnomalyService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getBuildingAnomaly(id: string) {
        return this.http.get<BuildingAnomaly[]>(this.apiUrl + 'inspection/building/' + id + '/anomaly', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getPictures(id: string) {
        return this.http.get<Picture[]>(this.apiUrl + 'inspection/building/anomaly/' + id + '/picture', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
