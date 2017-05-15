import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../core/services/base.service';
import {Building} from '../interfaces/building.interface';

@Injectable()
export class BuildingService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  get(id: string): Observable<Building> {
    return this.http.get('api/building/' + id, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data as Building;
    });
  }
}
