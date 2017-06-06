import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {HttpService} from '../../../core/http.service';
import {BaseService} from '../../../core/base.service';

@Injectable()
export class ApisActionService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('apisaction').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }
}
