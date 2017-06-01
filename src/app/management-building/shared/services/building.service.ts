import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Building} from '../models/building.model';

@Injectable()
export class BuildingService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'building', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/building');
      return result;
    });
  }

  public update(building: Building) {
    return this.http.put(
      this.host + 'building',
      JSON.stringify(building),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
