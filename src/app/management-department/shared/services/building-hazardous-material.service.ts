import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingHazardousMaterial} from '../models/building-hazardous-material.model';


@Injectable()
export class BuildingHazardousMaterialService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingHazardousMaterial[]> {
        return this.get('Building/' + idBuilding + '/hazardousmaterial');
    }

    getOne(idHazardousMatereial: string): Observable<BuildingHazardousMaterial[]> {
        return this.get('Building/hazardousmaterial/' + idHazardousMatereial);
    }

    save(idHazardousMatereial: BuildingHazardousMaterial) {
        return this.post('Building/hazardousmaterial', idHazardousMatereial);
    }

    remove(idPnaps: string) {
        return this.delete('Building/hazardousmaterial/' + idPnaps);
    }
}
