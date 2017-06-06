import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';

@Injectable()
export class StatisticService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public get(stat: string) {
    return this.http.get(this.host + 'webuserstatistic/' + stat, this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }
}
