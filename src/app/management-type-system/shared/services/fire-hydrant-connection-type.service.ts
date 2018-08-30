import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FireHydrantConnectionType} from '../models/fire-hydrant-connection-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantConnectionTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireHydrantConnectionType[]> {
        return this.get('FireHydrantConnectionType');
    }

    save(type: FireHydrantConnectionType) {
        return this.post('FireHydrantConnectionType', type);
    }

    remove(idType: string) {
        return this.delete('FireHydrantConnectionType/' + idType);
    }
}
