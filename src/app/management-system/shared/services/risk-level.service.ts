import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RiskLevel} from '../models/risk-level.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class RiskLevelService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<RiskLevel[]> {
        return this.get('RiskLevel');
    }

    localized(): Observable<RiskLevel[]> {
        return this.get('RiskLevel/localized');
    }

    save(level: RiskLevel) {
        return this.post('RiskLevel', level);
    }

    remove(idLevel: string) {
        return this.delete('RiskLevel/' + idLevel);
    }
}
