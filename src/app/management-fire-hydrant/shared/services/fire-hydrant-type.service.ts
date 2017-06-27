import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {FireHydrantType} from '../models/fire-hydrant-type.model';

@Injectable()
export class FireHydrantTypeService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('firehydranttype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idFireHydrantType: string) {
    return this.http.get('firehydranttype/' + idFireHydrantType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(type: FireHydrantType) {
    return this.http.post(
      'firehydranttype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());
  }

  public update(type: FireHydrantType) {
    return this.http.put(
      'firehydranttype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());
  }

  public remove(idFireHydrantType: string) {
    return this.http.delete('firehydranttype/' + idFireHydrantType).map((response: Response) => response.json());
  }
}
