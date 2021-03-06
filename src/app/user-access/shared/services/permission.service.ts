import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {Permission} from '../models/permission.model';


@Injectable()
export class PermissionService extends RequestService {

    public constructor(injector: Injector) {
        super(injector);
    }

    public getObjectPermission(idPermissionObject): Observable<Permission[]> {
        return this.get('groups/' + idPermissionObject);
    }

    public getUserPermission(idWebuser): Observable<Permission[]> {
        return this.get(`UserManagement/${idWebuser}/Permissions`);
    }

    public save(object: Permission) {
        return this.post('permission', object);
    }
}
