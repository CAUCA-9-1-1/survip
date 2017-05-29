import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../core/base.service';

@Injectable()
export class RiskLevelService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  getAll() {
    return this.http.get('api/risklevel', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data;
    });
  }

  getById(idRiskLevel: string) {
    return this.http.get('api/risklevel?idRiskLevel=' + idRiskLevel, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      if (result.data.length > 0) {
        return result.data[0];
      } else {
        return null;
      }
    });
  }
}
