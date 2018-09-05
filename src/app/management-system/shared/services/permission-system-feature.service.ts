import {Injectable, Injector} from '@angular/core';

import {RequestService} from '../../../shared/services/request.service';
import {PermissionObject} from '../models/permissionobject.model';
import {PermissionSystemFeature} from '../models/permissionsystemfeature.model';


@Injectable({
  providedIn: 'root'
})
export class PermissionSystemFeatureService extends RequestService {

    public constructor(injector: Injector) {
        super(injector);
    }

    public save(object: PermissionObject) {
        return this.post('PermissionSystemFeature', object);
    }
}
