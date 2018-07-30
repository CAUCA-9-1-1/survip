import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FireSafetyDepartment} from '../models/firesafetydepartment.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class FireSafetyDepartmentService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<FireSafetyDepartment[]> {
        return this.get('FireSafetyDepartment');
    }

    save(department: FireSafetyDepartment) {
        return this.post('FireSafetyDepartment', department);
    }

    remove(idDepartment: string) {
        return this.delete('FireSafetyDepartment/' + idDepartment);
    }
}
