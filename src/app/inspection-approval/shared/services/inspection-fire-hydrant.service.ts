import {Injectable, Injector} from '@angular/core';

import {RequestService} from '../../../shared/services/request.service';
import {Course} from '../models/course.model';


@Injectable({
    providedIn: 'root'
})
export class InspectionFireHydrantService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(id: string) {
        return this.get('inspection/' + id + '/firehydrant');
    }

    save(idBuilding: string, idFireHydrant: string) {
        return this.post('inspection/building/' + idBuilding + '/firehydrant/' + idFireHydrant, {});
    }

    delete(id: string) {
        return this.delete('inspection/buildingFireHydrant/' + id);
    }
}
