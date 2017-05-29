import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {County} from '../models/county.model';

@Injectable()
export class CountyService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'county', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(county: County) {
    return this.http.put(
      this.host + 'county',
      JSON.stringify(county),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
