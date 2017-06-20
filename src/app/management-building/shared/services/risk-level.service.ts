import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';

@Injectable()
export class RiskLevelService {

  constructor(private http: HttpService) { }

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
