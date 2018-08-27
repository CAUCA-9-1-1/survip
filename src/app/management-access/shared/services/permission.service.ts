import {Injectable, Injector} from '@angular/core';

import {Permission} from '../models/permission.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class PermissionService extends RequestService {

    public constructor(injector: Injector) {
        super(injector);
    }

    public getOne(idPermissionObject) {
        return this.get('permission/' + idPermissionObject);
    }

    public save(object: Permission) {
        return this.post('permission', object);
    }
}
