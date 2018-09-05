import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HazardousMaterial} from '../models/hazardous-material.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class HazardousMaterialService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<HazardousMaterial[]> {
        return this.get('HazardousMaterial');
    }

    localized(): Observable<HazardousMaterial[]> {
        return this.get('HazardousMaterial/localized');
    }

    getOne(idHazardousMaterial: string): Observable<HazardousMaterial> {
        return this.get('HazardousMaterial/' + idHazardousMaterial);
    }

    save(material: HazardousMaterial) {
        return this.post('HazardousMaterial', material);
    }

    remove(idHazardousMaterial: string) {
        return this.delete('HazardousMaterial/' + idHazardousMaterial);
    }
}
