import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {OperatorType} from '../models/operator-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class OperatorTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<OperatorType[]> {
        return this.get('OperatorType');
    }

    save(operator: OperatorType) {
        return this.post('OperatorType', operator);
    }

    remove(idOperator: string) {
        return this.delete('OperatorType/' + idOperator);
    }
}
