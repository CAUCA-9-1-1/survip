import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {PermissionWebuser} from '../models/permissionwebuser.model';

@Injectable()
export class PermissionWebuserService {

  constructor(private http: HttpService) { }

  public get(idPermissionObject) {
    return this.http.get('permissionwebuser/' + idPermissionObject).map((response: Response) => {
      const result = response.json();

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
