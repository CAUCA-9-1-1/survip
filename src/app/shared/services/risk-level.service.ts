import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService } from '../../core/services/base.service';

@Injectable()
export class RiskLevelService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/risklevel', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data;
    });
  }
}
