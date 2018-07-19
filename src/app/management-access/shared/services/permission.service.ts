import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Permission} from '../models/permission.model';


@Injectable()
export class PermissionService {

  constructor(private http: HttpClient) { }

  public getOne(idPermissionObject) {
    /*return this.http.get('permission/' + idPermissionObject).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(object: Permission) {
    /*return this.http.post(
      'permission',
      JSON.stringify(object)
    ).map((response: Response) => response.json());*/
  }

  public update(object: Permission) {
    /*return this.http.put(
      'permission',
      JSON.stringify(object)
    ).map((response: Response) => response.json());*/
  }
}
