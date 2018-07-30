import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingAnomaly} from '../../../management-building/shared/models/building-anomaly.model';
import {Picture} from '../../../shared/models/picture.model';


@Injectable()
export class InspectionBuildingAnomalyService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getBuildingAnomaly(id: string): Observable<BuildingAnomaly[]> {
        return this.get('inspection/building/' + id + '/anomaly');
    }

    getPictures(id: string): Observable<Picture[]> {
        return this.get('inspection/building/anomaly/' + id + '/picture');
    }
}
