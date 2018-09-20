import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';

import {OperatorType} from '../models/operator-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class OperatorTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<OperatorType[]> {
        return of([
            OperatorType.fromJSON({
                id: 'Equal',
                symbol: '='
            }),
            OperatorType.fromJSON({
                id: 'Greater',
                symbol: '>'
            }),
            OperatorType.fromJSON({
                id: 'GreaterOrEqual',
                symbol: '>='
            }),
            OperatorType.fromJSON({
                id: 'Less',
                symbol: '<'
            }),
            OperatorType.fromJSON({
                id: 'LessOrEqual',
                symbol: '<='
            })
        ]);
    }
}
