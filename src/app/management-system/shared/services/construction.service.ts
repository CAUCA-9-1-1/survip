import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Construction} from '../../../inspection-approval/shared/models/construction.model';
import {BuildingTypes} from '../../../inspection-approval/shared/models/building-types.model';


@Injectable()
export class ConstructionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getBuildingTypes(): Observable<BuildingTypes[]> {
        return this.get('construction/BuildingTypes');
    }

    getConstructionTypes(): Observable<Construction[]> {
        return this.get('construction/ConstructionTypes');
    }

    getFireResistanceTypes(): Observable<Construction[]> {
        return this.get('construction/FireResistanceTypes');
    }

    getRoofTypes(): Observable<Construction[]> {
        return this.get('construction/RoofTypes');
    }

    getRoofMaterialTypes(): Observable<Construction[]> {
        return this.get('construction/RoofMaterialTypes');
    }

    getSidingTypes(): Observable<Construction[]> {
        return this.get('construction/SidingTypes');
    }
}
