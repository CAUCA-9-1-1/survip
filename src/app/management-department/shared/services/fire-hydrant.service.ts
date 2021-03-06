import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

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

    getAllOfCity(idCity: string): Observable<FireHydrant[]> {
        return this.get('FireHydrant/city/' + idCity);
    }

    save(fireHydrant: FireHydrant) {
        return this.post('FireHydrant', fireHydrant);
    }

    remove(idFireHydrant: string) {
        return this.delete('FireHydrant/' + idFireHydrant);
    }
}
