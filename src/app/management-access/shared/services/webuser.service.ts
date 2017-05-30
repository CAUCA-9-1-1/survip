import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Webuser} from '../models/webuser.model';

@Injectable()
export class WebuserService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'webuser', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(user: Webuser) {
    return this.http.put(
      this.host + 'webuser',
      JSON.stringify(user),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
