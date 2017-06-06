import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {PermissionObject} from '../models/permissionobject.model';
import {HttpService} from "../../../core/http.service";

@Injectable()
export class PermissionObjectService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('permissionobject').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(object: PermissionObject) {
    return this.http.put(
      'permissionobject',
      JSON.stringify(object)
    ).map((response: Response) => response.json());
  }
}
