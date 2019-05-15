import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {InspectionGeneralInfo} from '../models/inspection-general-info.model';


@Injectable({
    providedIn: 'root'
})
export class InspectionDetailService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getGeneralInfo(id: string): Observable<InspectionGeneralInfo> {
        return this.get('inspection/' + id + '/detail');
    }

    saveTransversale(idBuilding: string, idLane: string) {
        return this.post('inspection/building/' + idBuilding + '/idLaneIntersection/' + idLane, {}).subscribe();
    }
}
