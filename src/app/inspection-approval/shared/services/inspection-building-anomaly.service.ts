import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingAnomaly} from '../../../management-building/shared/models/building-anomaly.model';
import {BuildingAnomalyPicture} from '../../../management-building/shared/models/building-anomaly-picture.model';


@Injectable()
export class InspectionBuildingAnomalyService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(id: string): Observable<BuildingAnomaly[]> {
        return this.get('inspection/building/' + id + '/anomalylist');
    }

    savePicture(anomalyPicture: BuildingAnomalyPicture) {
        return this.post('inspection/building/anomaly/picture', anomalyPicture);
    }

    save(anomaly: BuildingAnomaly) {
        return this.post('inspection/building/anomaly', anomaly);
    }

    remove(idAnomaly: string) {
        return this.delete('inspection/building/anomaly/' + idAnomaly);
    }
}
