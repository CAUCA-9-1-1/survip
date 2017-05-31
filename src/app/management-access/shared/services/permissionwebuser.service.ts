import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {PermissionWebuser} from '../models/permissionwebuser.model';

@Injectable()
export class PermissionWebuserService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public get(idPermissionObject) {
    const url = this.host + 'permissionwebuser/' + idPermissionObject;

    return this.http.get(url, this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }


  public update(permission: PermissionWebuser) {
    return this.http.put(
      this.host + 'permissionwebuser',
      JSON.stringify(permission),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
