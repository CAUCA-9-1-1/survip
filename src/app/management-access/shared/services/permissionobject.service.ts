import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {PermissionObject} from '../models/permissionobject.model';


@Injectable()
export class PermissionObjectService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('permissionobject').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public update(object: PermissionObject) {
    /*return this.http.put(
      'permissionobject',
      JSON.stringify(object)
    ).map((response: Response) => response.json());*/
  }
}
