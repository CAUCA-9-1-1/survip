import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {PermissionObject} from '../models/permissionobject.model';

@Injectable()
export class PermissionObjectService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'permissionobject', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(object: PermissionObject) {
    return this.http.put(
      this.host + 'permissionobject',
      JSON.stringify(object),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
