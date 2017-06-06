import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {PermissionWebuser} from '../models/permissionwebuser.model';

@Injectable()
export class PermissionWebuserService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public get(idPermissionObject) {
    return this.http.get('permissionwebuser/' + idPermissionObject).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }


  public update(permission: PermissionWebuser) {
    return this.http.put(
      'permissionwebuser',
      JSON.stringify(permission)
    ).map((response: Response) => response.json());
  }
}
