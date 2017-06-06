import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {Webuser} from '../models/webuser.model';

@Injectable()
export class WebuserService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('webuser').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/access');
      return result;
    });
  }

  public update(user: Webuser) {
    return this.http.put(
      'webuser',
      JSON.stringify(user)
    ).map((response: Response) => response.json());
  }
}
