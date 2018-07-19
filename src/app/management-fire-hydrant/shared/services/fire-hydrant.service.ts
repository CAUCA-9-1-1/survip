import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FireHydrant} from '../models/fire-hydrant.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireHydrantService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireHydrant[]> {
        return this.get('FireHydrant');
    }

    save(fireHydrant: FireHydrant) {
        return this.post('FireHydrant', fireHydrant);
    }

    remove(idFireHydrant: string) {
        return this.delete('FireHydrant/' + idFireHydrant);
    }
}
