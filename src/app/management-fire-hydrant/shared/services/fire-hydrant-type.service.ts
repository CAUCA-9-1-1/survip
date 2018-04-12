import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {FireHydrantType} from '../models/fire-hydrant-type.model';


@Injectable()
export class FireHydrantTypeService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('firehydranttype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public get(idFireHydrantType: string) {
    /*return this.http.get('firehydranttype/' + idFireHydrantType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(type: FireHydrantType) {
    /*return this.http.post(
      'firehydranttype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());*/
  }

  public update(type: FireHydrantType) {
    /*return this.http.put(
      'firehydranttype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());*/
  }

  public remove(idFireHydrantType: string) {
    // return this.http.delete('firehydranttype/' + idFireHydrantType).map((response: Response) => response.json());
  }
}
