import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {PermissionManagement} from '../models/permission-management';
import {RequestService} from '../../../shared/services/request.service';
@Injectable({
  providedIn: 'root'
})
export class PermissionManagementService extends RequestService {

  constructor(injector: Injector) {
    super(injector);
  }

  public getAllPermissions(): Observable<PermissionManagement[]> {
    return this.get(`PermissionManagement`);
  }
}
