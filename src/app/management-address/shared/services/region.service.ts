import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../core/base.service';
import {Region} from '../models/region.model';

@Injectable()
export class RegionService extends BaseService {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  public getAll() {
    return this.http.get(this.host + 'region', this.authorization()).map((response: Response) => {
      const result = response.json();

      this.isLogin(result, '/management/address');
      return result;
    });
  }

  public update(region: Region) {
    return this.http.put(
      this.host + 'region',
      JSON.stringify(region),
      this.authorization()
    ).map((response: Response) => response.json());
  }
}
