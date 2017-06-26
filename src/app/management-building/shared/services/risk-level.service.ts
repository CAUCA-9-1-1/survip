import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {RiskLevel} from '../models/risk-level.model';

@Injectable()
export class RiskLevelService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('risklevel').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idRiskLevel: string) {
    return this.http.get('risklevel/' + idRiskLevel).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(level: RiskLevel) {
    return this.http.post(
      'risklevel',
      JSON.stringify(level)
    ).map((response: Response) => response.json());
  }

  public update(level: RiskLevel) {
    return this.http.put(
      'risklevel',
      JSON.stringify(level),
    ).map((response: Response) => response.json());
  }

  public remove(idRiskLevel: string) {
    return this.http.delete('risklevel/' + idRiskLevel).map((response: Response) => response.json());
  }
}
