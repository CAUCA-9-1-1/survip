import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Region} from '../models/region.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class RegionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Region[]> {
        return this.get('Region');
    }

    localized(): Observable<Region[]> {
        return this.get('Region/localized');
    }

    save(region: Region) {
        return this.post('Region', region);
    }

    remove(idRegion: string) {
        return this.delete('Region/' + idRegion);
    }
}
