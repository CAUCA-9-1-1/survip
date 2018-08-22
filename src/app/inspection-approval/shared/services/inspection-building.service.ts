import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BuildingDetails} from '../models/building-details.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class InspectionBuildingService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getDetail(id: string): Observable<BuildingDetails> {
        return this.get('inspection/building/' + id + '/detail');
    }

    saveDetail(details: BuildingDetails) {
        return this.post('inspection/building/detail', details);
    }
}
