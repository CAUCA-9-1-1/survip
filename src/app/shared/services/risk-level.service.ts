import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {BaseService} from '../../core/base.service';
import {HttpService} from '../../core/http.service';

@Injectable()
export class RiskLevelService extends BaseService {

  constructor(http: HttpService) {
    super(http);
  }

  getAll() {
    return this.http.get('risklevel').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  get(idRiskLevel: string) {
    return this.http.get('risklevel/' + idRiskLevel).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }
}
