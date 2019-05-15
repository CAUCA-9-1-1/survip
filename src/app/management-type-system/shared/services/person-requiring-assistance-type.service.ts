import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {PersonRequiringAssistanceType} from '../models/person-requiring-assistance-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class PersonRequiringAssistanceTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<PersonRequiringAssistanceType[]> {
        return this.get('PersonRequiringAssistanceType');
    }

    localized(): Observable<PersonRequiringAssistanceType[]> {
        return this.get('PersonRequiringAssistanceType/localized');
    }

    save(type: PersonRequiringAssistanceType) {
        return this.post('PersonRequiringAssistanceType', type);
    }

    remove(idPersonRequiringAssistanceType: string) {
        return this.delete('PersonRequiringAssistanceType/' + idPersonRequiringAssistanceType);
    }
}
