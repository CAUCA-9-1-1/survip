import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';

@Injectable()
export class ApisActionService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'apisaction', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }
}
