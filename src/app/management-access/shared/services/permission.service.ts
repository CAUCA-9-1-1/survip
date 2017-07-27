import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {Permission} from '../models/permission.model';

@Injectable()
export class PermissionService {

  constructor(private http: HttpService) { }

  public get(idPermissionObject) {
    return this.http.get('permission/' + idPermissionObject).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(object: Permission) {
    return this.http.post(
      'permission',
      JSON.stringify(object)
    ).map((response: Response) => response.json());
  }

  public update(object: Permission) {
    return this.http.put(
      'permission',
      JSON.stringify(object)
    ).map((response: Response) => response.json());
  }
}
