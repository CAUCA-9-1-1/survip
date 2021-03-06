import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingHazardousMaterial} from '../../../management-department/shared/models/building-hazardous-material.model';


@Injectable()
export class InspectionBuildingHazardousMaterialService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingHazardousMaterial[]> {
        return this.get('inspection/building/' + idBuilding + '/hazardousmateriallist');
    }

    getOne(idHazardousMatereial: string): Observable<BuildingHazardousMaterial[]> {
        return this.get('inspection/building/hazardousmaterial/' + idHazardousMatereial);
    }

    save(idHazardousMatereial: BuildingHazardousMaterial) {
        return this.post('inspection/building/hazardousmaterial', idHazardousMatereial);
    }

    remove(idPnaps: string) {
        return this.delete('inspection/building/hazardousmaterial/' + idPnaps);
    }
}
