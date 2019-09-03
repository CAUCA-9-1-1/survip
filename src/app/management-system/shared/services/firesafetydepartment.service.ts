import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {FireSafetyDepartment} from '../models/firesafetydepartment.model';
import {RequestService} from '../../../shared/services/request.service';
import {FireSafetyDepartmentLocalizedModel} from '../models/fire-safety-department-localized-model';


@Injectable()
export class FireSafetyDepartmentService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireSafetyDepartment[]> {
        return this.get('FireSafetyDepartment');
    }

    localized(): Observable<FireSafetyDepartment[]> {
        return this.get('FireSafetyDepartment/localized');
    }

    allLocalized(): Observable<FireSafetyDepartment[]> {
       return this.get('FireSafetyDepartment/alllocalized');
    }

    save(department: FireSafetyDepartment) {
        return this.post('FireSafetyDepartment', department);
    }

    remove(idDepartment: string) {
        return this.delete('FireSafetyDepartment/' + idDepartment);
    }

    allLocalizedForUser(): Observable<FireSafetyDepartmentLocalizedModel[]> {
      return this.get('FireSafetyDepartment/alllocalized');
    }
}
