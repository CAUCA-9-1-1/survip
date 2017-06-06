import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';

@Injectable()
export class StatisticService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public get(stat: string) {
    return this.http.get('webuserstatistic/' + stat).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }
}
