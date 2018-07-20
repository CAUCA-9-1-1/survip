import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {UnitOfMeasure} from '../models/unit-of-measure.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class UnitOfMeasureService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<UnitOfMeasure[]> {
        return this.get('UnitOfMeasure');
    }

    save(unit: UnitOfMeasure) {
        return this.post('UnitOfMeasure', unit);
    }

    remove(idUnitOfMeasure: string) {
        return this.delete('UnitOfMeasure/' + idUnitOfMeasure);
    }

    getCapacity(): Observable<UnitOfMeasure[]> {
        return this.get('UnitOfMeasure/capacity');
    }

    getDimension(): Observable<UnitOfMeasure[]> {
        return this.get('UnitOfMeasure/dimension');
    }

    getPressure(): Observable<UnitOfMeasure[]> {
        return this.get('UnitOfMeasure/pressure');
    }

    getRate(): Observable<UnitOfMeasure[]> {
        return this.get('UnitOfMeasure/rate');
    }
}
