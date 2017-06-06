import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Lane} from '../models/lane.model';

@Injectable()
export class LaneService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('lane').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(lane: Lane) {
    return this.http.put(
      'lane',
      JSON.stringify(lane),
    ).map((response: Response) => response.json());
  }
}
