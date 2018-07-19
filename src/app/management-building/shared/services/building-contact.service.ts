import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingContact} from '../models/building-contact.model';


@Injectable()
export class BuildingContactService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string): Observable<BuildingContact[]> {
        return this.get('Building/' + idBuilding + '/Contact');
    }

    getOne(idContact: string): Observable<BuildingContact[]> {
        return this.get('Building/Contact/' + idContact);
    }

    save(contact: BuildingContact) {
        return this.post('Building/Contact', contact);
    }

    remove(idContact: string) {
        return this.delete('Building/Contact/' + idContact);
    }
}
