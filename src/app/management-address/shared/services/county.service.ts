import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {HttpService} from '../../../core/http.service';
import {County} from '../models/county.model';

@Injectable()
export class CountyService extends BaseService {

  constructor(http: HttpService, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get('county').map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(county: County) {
    return this.http.put(
      'county',
      JSON.stringify(county),
    ).map((response: Response) => response.json());
  }
}
