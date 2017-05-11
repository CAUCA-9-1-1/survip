import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../../core/services/base.service';
import {Firestation} from '../models/firestation';

@Injectable()
export class FirestationService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/firestation', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data as Firestation[];
    });
  }

  get(id: string) {
    return this.http.get('api/firestation?id=' + id, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data[0] as Firestation;
    });
  }
}
