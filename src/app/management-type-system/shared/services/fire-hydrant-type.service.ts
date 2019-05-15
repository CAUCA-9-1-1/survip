import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {FireHydrantType} from '../models/fire-hydrant-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireHydrantType[]> {
        return this.get('FireHydrantType');
    }

    localized(): Observable<FireHydrantType[]> {
      return this.get('FireHydrantType/localized');
    }

    save(type: FireHydrantType) {
        return this.post('FireHydrantType', type);
    }

    remove(idType: string) {
        return this.delete('FireHydrantType/' + idType);
    }
}
