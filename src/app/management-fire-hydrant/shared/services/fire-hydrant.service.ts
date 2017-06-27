import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {FireHydrant} from '../models/fire-hydrant.model';

@Injectable()
export class FireHydrantService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('firehydrant').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idFireHydrant: string) {
    return this.http.get('firehydrant/' + idFireHydrant).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(fireHydrant: FireHydrant) {
    return this.http.post(
      'firehydrant',
      JSON.stringify(fireHydrant)
    ).map((response: Response) => response.json());
  }

  public update(fireHydrant: FireHydrant) {
    return this.http.put(
      'firehydrant',
      JSON.stringify(fireHydrant),
    ).map((response: Response) => response.json());
  }

  public remove(idFireHydrant: string) {
    return this.http.delete('firehydrant/' + idFireHydrant).map((response: Response) => response.json());
  }
}
