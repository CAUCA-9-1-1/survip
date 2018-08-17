import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingContact} from '../../../management-building/shared/models/building-contact.model';


@Injectable()
export class InspectionBuildingContactService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingContact[]> {
        return this.get('Inspection/Building/' + idBuilding + '/ContactList');
    }

    getOne(idContact: string): Observable<BuildingContact[]> {
        return this.get('Inspection/Building/Contact/' + idContact);
    }

    save(contact: BuildingContact) {
        return this.post('Inspection/Building/Contact', contact);
    }

    remove(idContact: string) {
        return this.delete('Inspection/Building/Contact/' + idContact);
    }
}
