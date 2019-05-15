import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {County} from '../models/county.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CountyService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<County[]> {
        return this.get('County');
    }

    localized(): Observable<County[]> {
        return this.get('County/localized');
    }

    save(county: County) {
        return this.post('County', county);
    }

    remove(idCounty: string) {
        return this.delete('County/' + idCounty);
    }
}
