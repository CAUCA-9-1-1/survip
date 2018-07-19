import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {LaneGenericCode} from '../models/lane-generic-code.model';


@Injectable()
export class LaneGenericCodeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<LaneGenericCode[]> {
        return this.get('LaneGenericCode');
    }
}
