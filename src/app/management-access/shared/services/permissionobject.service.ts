import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {PermissionObject} from '../models/permissionobject.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class PermissionObjectService extends RequestService {

    public constructor(injector: Injector) {
        super(injector);
    }

    public getAll(): Observable<PermissionObject[]> {
        return this.get('PermissionObject');
    }

    public save(object: PermissionObject) {
        return this.post('PermissionObject', object);
    }
}
