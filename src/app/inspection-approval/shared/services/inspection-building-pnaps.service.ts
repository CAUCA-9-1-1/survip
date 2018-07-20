import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingPnaps} from '../../../management-building/shared/models/building-pnaps.model';


@Injectable()
export class InspectionBuildingPnapsService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingPnaps[]> {
        return this.get('inspection/building/' + idBuilding + '/pnaps');
    }

    getOne(idPnaps: string): Observable<BuildingPnaps[]> {
        return this.get('inspection/building/pnaps/' + idPnaps);
    }

    save(pnaps: BuildingPnaps) {
        return this.post('inspection/building/pnaps', pnaps);
    }

    remove(idPnaps: string) {
        return this.delete('inspection/building/pnaps/' + idPnaps);
    }
}
