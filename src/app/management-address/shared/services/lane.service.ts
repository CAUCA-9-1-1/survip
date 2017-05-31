import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Lane} from '../models/lane.model';

@Injectable()
export class LaneService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'lane', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(lane: Lane) {
    return this.http.put(
      this.host + 'lane',
      JSON.stringify(lane),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
