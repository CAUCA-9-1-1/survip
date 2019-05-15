import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingPnaps} from '../models/building-pnaps.model';


@Injectable()
export class BuildingPnapsService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingPnaps[]> {
        return this.get('Building/' + idBuilding + '/pnaps');
    }

    getOne(idPnaps: string): Observable<BuildingPnaps> {
        return this.get('Building/pnaps/' + idPnaps);
    }

    save(pnaps: BuildingPnaps) {
        return this.post('Building/pnaps', pnaps);
    }

    remove(idPnaps: string) {
        return this.delete('Building/pnaps/' + idPnaps);
    }
}
