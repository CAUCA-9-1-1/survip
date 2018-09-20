import {Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {EnumModel} from '../models/enum.model';


@Injectable()
export class OperatorTypeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<EnumModel[]> {
        return of([
            EnumModel.fromJSON({
                value: 0,
                name: 'Equal',
                text: '='
            }),
            EnumModel.fromJSON({
                value: 1,
                name: 'Greater',
                text: '>'
            }),
            EnumModel.fromJSON({
                value: 2,
                name: 'GreaterOrEqual',
                text: '>='
            }),
            EnumModel.fromJSON({
                value: 3,
                name: 'Less',
                text: '<'
            }),
            EnumModel.fromJSON({
                value: 4,
                name: 'LessOrEqual',
                text: '<='
            })
        ]);
    }
}
