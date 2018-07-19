import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Building} from '../models/building.model';


@Injectable()
export class BuildingService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(id?: string): Observable<Building[]> {
        let url = 'Building';

        if (id) {
            url += '/child/' + id;
        }

        return this.get(url);
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
