import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {FireSafetyDepartmentRiskLevel} from '../models/fire-safety-department-risk-level.model';


@Injectable()
export class FireSafetyDepartmentRiskLevelService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireSafetyDepartmentRiskLevel[]> {
        return this.get('FireSafetyDepartmentRiskLevel');
    }

    save(ssi: FireSafetyDepartmentRiskLevel) {
        return this.post('FireSafetyDepartmentRiskLevel', ssi);
    }

    remove(idFireSafetyDepartmentRiskLevel: string) {
        return this.delete('FireSafetyDepartmentRiskLevel/' + idFireSafetyDepartmentRiskLevel);
    }
}
