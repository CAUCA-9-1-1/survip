import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {CityType} from '../models/citytype.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CityTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<CityType[]> {
        return this.get('CityType');
    }

    localized(): Observable<CityType[]> {
        return this.get('CityType/localized');
    }

    save(cityType: CityType) {
        return this.post('CityType', cityType);
    }

    remove(idCityType: string) {
        return this.delete('CityType/' + idCityType);
    }
}
