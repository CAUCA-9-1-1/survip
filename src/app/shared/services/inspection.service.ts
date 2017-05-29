import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../core/base.service';
import {Inspection} from '../interfaces/inspection.interface';

@Injectable()
export class InspectionService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  getAll(): Observable<Inspection[]> {
    return this.http.get('api/inspection', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data;
    });
  }

  get(id: string): Observable<Inspection> {
    return this.http.get('api/inspection/' + id, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data as Inspection;
    });
  }
}
