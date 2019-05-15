import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Building} from '../models/building.model';


@Injectable()
export class BuildingService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getActiveForFireSafetyDepartment(idFireSafetyDepartment: string): Observable<Building[]> {
        return this.get('Building/Active/' + idFireSafetyDepartment);
    }

    getForInspectionlist(ids: string[]) {
      return this.post('building/ForInspectionList', ids);
    }

    getActive(): Observable<Building[]> {
        return this.get('Building/Active');
    }

    save(building: Building) {
        return this.post('Building', building);
    }

    remove(idBuilding: string) {
        return this.delete('Building/' + idBuilding);
    }
}
