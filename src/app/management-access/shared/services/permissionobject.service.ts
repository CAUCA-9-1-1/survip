import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {PermissionObject} from '../models/permissionobject.model';

@Injectable()
export class PermissionObjectService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('permissionobject').map((response: Response) => {
      const result = response.json();

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
