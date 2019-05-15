import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {LanePublicCode} from '../models/lane-public-code.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class LanePublicCodeService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<LanePublicCode[]> {
        return this.get('LanePublicCode');
    }
}
